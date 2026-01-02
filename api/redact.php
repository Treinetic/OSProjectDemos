<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    $redactText = $_POST['redact_text'] ?? '';
    if (empty($redactText)) {
        throw new Exception("Redaction text is required");
    }

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'redacted.pdf';

    // v3.1
    $pdf = PDF::init();
    $pdf->from($source);
    $pdf->redact($redactText, $outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
