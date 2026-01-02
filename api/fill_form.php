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
    $pdf = new PDF(new \ImalH\PDFLib\Drivers\PdftkDriver());
    $pdf->from($source);
    // fillForm in facade might not chain correctly if it returns bool.
    // Facade inspection: public function fillForm(array $data, string $destination = null)
    // It returns $this (chainable) or bool?
    // In v3.1 Facade, fillForm returns $this if destination is null? 
    // Actually, let's look at how I wrote it before: $pdf->fillForm($formData, $outputFile);
    // If destination is provided, it executes immediately.
    $pdf->fillForm($formData, $outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
