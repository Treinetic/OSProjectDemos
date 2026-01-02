<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    $userPassword = $_POST['user_password'] ?? '1234';
    $ownerPassword = $_POST['owner_password'] ?? 'admin';

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'protected.pdf';

    $pdf = PDF::init();
    $pdf->from($source)
        ->encrypt($userPassword, $ownerPassword)
        ->save($outputFile);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
