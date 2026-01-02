<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    $text = $_POST['text'] ?? null;
    if (!$text) {
        throw new Exception("Please provide text to redact.");
    }

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'redacted.pdf';

    PDF::init()
        ->driver(PDF::DRIVER_GHOSTSCRIPT)
        ->from($source)
        ->redact($text, $outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
