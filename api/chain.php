<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'chained_output.pdf';

    // Demonstrate Chain: Rotate -> Watermark -> Save
    // Note: Implicitly uses GhostscriptDriver for these.

    PDF::init()
        ->driver(PDF::DRIVER_GHOSTSCRIPT)
        ->from($source)
        ->rotate(90) // Add rotation to pipeline
        ->watermark('CHAINED DEMO') // Add watermark to pipeline
        ->save($outputFile); // Execute pipeline

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
