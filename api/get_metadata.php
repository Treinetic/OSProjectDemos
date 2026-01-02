<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Use LocalPdftkDriver for metadata (Fixes bug in vendor driver)
    require_once 'LocalPdftkDriver.php';
    $pdf = new PDF(new LocalPdftkDriver());

    $meta = $pdf->getMetadata($source);

    jsonResponse([
        'success' => true,
        'json_result' => $meta
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
