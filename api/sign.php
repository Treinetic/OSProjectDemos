<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    // 1. Handle PDF Upload
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // 2. Handle Certificate & Key
    // We expect them as separate file inputs or standard uploads
    $certPaths = handleUpload('certificate');
    $keyPaths = handleUpload('private_key');

    $certPath = $certPaths[0];
    $keyPath = $keyPaths[0];

    // Password is optional
    $password = $_POST['password'] ?? '';

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'signed.pdf';

    // v3.1 Pattern
    // sign() is often a direct driver call or pipeline. 
    // Based on previous audit, PDF.php has sign() method.
    $pdf = PDF::init();
    $pdf->from($source);

    // sign($cert, $key, $dest, $options)
    $options = [];
    if (!empty($password)) {
        $options['password'] = $password;
    }

    $pdf->sign($certPath, $keyPath, $outputFile, $options);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
