<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Get Form Fields
    // This will use the (currently buggy) PdftkDriver to get the fields.
    // We return them as-is to show the user exactly what the library sees.
    $fields = PDF::init()
        ->driver(PDF::DRIVER_PDFTK)
        ->from($source)
        ->getFormFields($source);

    jsonResponse([
        'success' => true,
        'fields' => $fields,
        'count' => count($fields)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
