<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;
use ImalH\PDFLib\Drivers\PdftkDriver;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Ghostscript driver might not support getMetadata?
    // User requested Pdftk for forms, maybe metadata too?
    // PdftkDriver has getMetadata implemented (I saw it).
    // GhostscriptDriver probably doesn't or it's limited.
    // Safe bet: Use PdftkDriver for metadata extraction too if we want reliability.
    $pdf = new PDF(new PdftkDriver());

    // PDF.php getMetadata($source)
    $metadata = $pdf->getMetadata($source);

    jsonResponse([
        'success' => true,
        'json_result' => $metadata // Key-Value pairs
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
