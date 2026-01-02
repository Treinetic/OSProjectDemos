<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;
use ImalH\PDFLib\Drivers\PdftkDriver;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // PDF.php getNumberOfPages() -> driver->getNumberOfPages($source)
    // Most drivers support this. Let's use PdftkDriver to be consistent with extraction utilities.
    $pdf = new PDF(new PdftkDriver());

    // Check if getNumberOfPages on facade accepts explicit source?
    // public function getNumberOfPages() { if $this->source ... setSource ... return driver->getNumberOfPages($source) }
    // It uses $this->source. 
    // So we need to call ->from($source) first?
    // OR we check PHP.php line 171: return $this->driver->getNumberOfPages($this->source);

    $pdf->from($source);
    $count = $pdf->getNumberOfPages();

    jsonResponse([
        'success' => true,
        'text_result' => "Total Pages: " . $count
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
