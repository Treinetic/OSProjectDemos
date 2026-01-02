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

    // Use PdftkDriver (v3.1.4 fixed bugs)
    $driver = new \ImalH\PDFLib\Drivers\PdftkDriver();
    $pdf = new PDF($driver);
    $pdf->from($source);

    error_log("Form Data Received: " . print_r($formData, true));
    file_put_contents('debug_data.txt', print_r($formData, true));
    error_log("Source File: " . $source);
    error_log("Driver: " . get_class($driver));

    $pdf->fillForm($formData, $outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
