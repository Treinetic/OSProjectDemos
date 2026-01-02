<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Use LocalPdftkDriver for page count (Fixes bug in vendor driver)
    require_once 'LocalPdftkDriver.php';
    $pdf = new PDF(new LocalPdftkDriver());

    // Facade getNumberOfPages
    $count = $pdf->getNumberOfPages($source);

    jsonResponse([
        'success' => true,
        'text_result' => "Pages: " . $count
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
