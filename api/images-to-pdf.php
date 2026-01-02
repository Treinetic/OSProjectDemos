<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    // Expecting 'pdf[]' upload (files are images)
    // We reuse handleUpload logic, it works for images too if we pass the key 'pdf'
    // Frontend sends 'pdf[]' which PHP maps to $_FILES['pdf']
    $paths = handleUpload('pdf');

    if (count($paths) < 1) {
        throw new Exception("Please upload at least 1 image.");
    }

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'images.pdf';

    // Strategy: Convert each image to PDF first, then merge.
    // This avoids complex GS image pipeline issues.
    $tempPdfs = [];
    $isMac = (PHP_OS_FAMILY === 'Darwin');
    $gsBin = ($isMac) ? 'gs' : ((strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') ? 'gswin64c' : 'gs');

    foreach ($paths as $idx => $img) {
        $tempPdf = $jobDir . 'temp_img_' . $idx . '.pdf';

        if ($isMac) {
            // Use sips on Mac
            exec("sips -s format pdf " . escapeshellarg($img) . " --out " . escapeshellarg($tempPdf));
        } else {
            // Try GS for single image to PDF (might still fail if GS build is strict, but better chance)
            // or try Imagick if available (Docker)
            if (class_exists('Imagick')) {
                $imagick = new Imagick($img);
                $imagick->setImageFormat('pdf');
                $imagick->writeImages($tempPdf, true);
            } else {
                // Fallback GS attempt: convert single image
                // gs -sDEVICE=pdfwrite -sOutputFile=pdf.pdf -dNOPAUSE -dBATCH image.jpg
                // If this failed before, it might fail here too.
                // But strictly, we need a solution.
                throw new Exception("No image conversion tool found (Imagick missing).");
            }
        }

        if (file_exists($tempPdf)) {
            $tempPdfs[] = $tempPdf;
        }
    }

    if (count($tempPdfs) > 0) {
        // Merge the temp PDFs
        $pdf = PDF::init();
        $pdf->merge($tempPdfs, $outputFile);

        // Cleanup temp files
        foreach ($tempPdfs as $tp)
            unlink($tp);
    } else {
        throw new Exception("Failed to convert images to intermediate PDFs.");
    }

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
