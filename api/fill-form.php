<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    $jsonData = $_POST['data'] ?? '{}';
    $formData = json_decode($jsonData, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        // If simple key-value pairs aren't passed as JSON, try POST directly?
        // Demo might send JSON string.
        // Or if formData is empty, use dummy data for demo purposes?
        // Let's assume the frontend sends a 'data' JSON string.
        if (empty($formData) && !empty($_POST)) {
            // Fallback: use all POST vars except 'pdf' and 'data'
            $formData = $_POST;
            unset($formData['pdf']);
            unset($formData['data']);
        }
    }

    // If still empty, use some dummy data for the "demo" effect if user didn't provide any
    if (empty($formData)) {
        $formData = [
            'full_name' => 'John Doe',
            'date' => date('Y-m-d')
        ];
    }

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'filled.pdf';

    PDF::init()
        ->driver(PDF::DRIVER_PDFTK)
        ->from($source)
        ->fillForm($formData, $outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
