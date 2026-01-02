<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'thumbnail.jpg';

    $pdf = PDF::init();
    $pdf->from($source);
    $pdf->thumbnail($outputFile, 200);

    jsonResponse([
        'success' => true,
        'image_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
