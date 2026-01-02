<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Use LocalPdftkDriver for form inspection (Fixes bug in vendor driver)
    require_once 'LocalPdftkDriver.php';
    $pdf = new PDF(new LocalPdftkDriver());

    // Facade getFormFields
    $fields = $pdf->getFormFields($source);

    jsonResponse([
        'success' => true,
        'json_result' => $fields
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
