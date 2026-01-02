<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Get range from POST, default to page 1
    $range = $_POST['range'] ?? '1';

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'split.pdf';

    $pdf = PDF::init();
    $pdf->from($source);
    $pdf->split($range, $outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
