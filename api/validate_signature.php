<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // v3.1 Sequential Pipeline Pattern
    $pdf = PDF::init();
    $valid = $pdf->load($source)
        ->validateSignature();

    jsonResponse([
        'success' => true,
        'message' => $valid ? "Signature is VALID." : "Signature is INVALID or NOT FOUND.",
        'image_url' => $valid
            ? 'https://via.placeholder.com/600x200/10b981/ffffff?text=Signature+VALID'
            : 'https://via.placeholder.com/600x200/ef4444/ffffff?text=Signature+INVALID'
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
