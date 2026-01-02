<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    $text = $_POST['watermark_text'] ?? 'CONFIDENTIAL';

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'watermarked.pdf';

    $pdf = PDF::init();
    $pdf->from($source)
        ->watermark($text)
        ->save($outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
