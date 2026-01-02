<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    $degrees = intval($_POST['degrees'] ?? 90);

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'rotated.pdf';

    $pdf = PDF::init();
    $pdf->from($source)
        ->rotate($degrees)
        ->save($outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
