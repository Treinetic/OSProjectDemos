<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Use PdftkDriver (v3.1.4 fixed bugs)
    $pdf = new PDF(new \ImalH\PDFLib\Drivers\PdftkDriver());

    // Facade getFormFields
    $fields = $pdf->getFormFields($source);

    jsonResponse([
        'success' => true,
        'json_result' => $fields
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
