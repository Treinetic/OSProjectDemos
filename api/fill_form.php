<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    $jsonData = $_POST['form_data'] ?? '{}';
    $formData = json_decode($jsonData, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON data provided.");
    }

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'filled.pdf';

    $pdf = PDF::init();
    $pdf->from($source);
    $pdf->fillForm($formData, $outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
