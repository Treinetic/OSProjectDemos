<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Use PdftkDriver (v3.1.4 fixed bugs)
    $pdf = new PDF(new \ImalH\PDFLib\Drivers\PdftkDriver());

    // Facade getNumberOfPages
    $count = $pdf->getNumberOfPages($source);

    jsonResponse([
        'success' => true,
        'text_result' => "Pages: " . $count
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
