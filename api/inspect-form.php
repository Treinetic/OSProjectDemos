<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Inspect the form
    // Note: getFormFields returns an array of field names/details.
    // We initiate with PdftkDriver.

    $fields = PDF::init()
        ->driver(PDF::DRIVER_PDFTK)
        ->from($source)
        ->getFormFields($source);

    // If fields is null or empty, it might not be a form, or simply no fields.
    jsonResponse([
        'success' => true,
        'fields' => $fields,
        'is_form' => count($fields) > 0
    ]);

} catch (Exception $e) {
    // If it fails (e.g. not a form causing driver error), we catch it.
    // PdftkDriver might throw if it can't parse.
    jsonResponse(['success' => false, 'error' => $e->getMessage(), 'is_form' => false]);
}
