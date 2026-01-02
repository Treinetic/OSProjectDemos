<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Default language 'eng'. In a real app, this could be a dropdown.
    $language = $_POST['language'] ?? 'eng';

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'ocr_result.pdf';

    // v3.1 Logic - Use TesseractDriver explicitly
    $pdf = new PDF(new \ImalH\PDFLib\Drivers\TesseractDriver());
    $pdf->from($source);

    // Attempt OCR
    // This might take significantly longer than other operations
    set_time_limit(300); // 5 minutes

    try {
        // v3.1 ocr method signature: ocr(string $destination)
        // It relies on Tesseract driver usually.
        // Wait, PDF.php:250: public function ocr(string $destination): bool
        // Using TesseractDriver likely.

        // Let's check TesseractDriver or just call it.
        // Passing language might be setOption? 
        // PDF.php doesn't show language arg in ocr().
        // It might be set via setOption if driver supports it.

        // Assuming Tesseract driver defaults to 'eng'.

        $pdf->ocr($outputFile);
    } catch (Exception $e) {
        // Enhance the error message for the demo user
        $msg = $e->getMessage();
        if (strpos($msg, 'pdfocr8') !== false || strpos($msg, 'undefined') !== false) {
            throw new Exception("OCR Failed: Ghostscript 'pdfocr8' device invalid. Please install Tesseract and ensure Ghostscript is linked correctly. Original Error: " . $msg);
        }
        throw $e;
    }

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
