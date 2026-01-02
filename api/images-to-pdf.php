<?php
require_once 'utils.php';
use ImalH\PDFLib\PDFLib;

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

    // PDFLib v3.1.4 makePDF is broken.
    // Use TCPDF (installed dependency) to generate PDF from images.
    $pdf = new TCPDF();
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetAutoPageBreak(false);

    foreach ($paths as $img) {
        $pdf->AddPage();
        // Add image, fit to page (A4 default: 210x297mm)
        // Image($file, $x, $y, $w, $h, ...)
        $pdf->Image($img, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0, 'FitPage');
    }

    $pdf->Output($outputFile, 'F');

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
