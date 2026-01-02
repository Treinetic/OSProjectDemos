<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'signed.pdf';

    // Generate dummy certs if not exist
    $certFile = __DIR__ . '/certificate.crt';
    $keyFile = __DIR__ . '/private.key';

    if (!file_exists($certFile) || !file_exists($keyFile)) {
        // Generate self-signed cert for demo
        // Openssl command: openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate.crt -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
        shell_exec("openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout " . escapeshellarg($keyFile) . " -out " . escapeshellarg($certFile) . " -subj \"/C=US/ST=State/L=City/O=Organization/CN=localhost\" 2>&1");
    }

    PDF::init()
        ->driver(PDF::DRIVER_OPENSSL)
        ->from($source)
        ->sign($certFile, $keyFile, $outputFile, [
            'info' => [
                'Name' => 'Antigravity Demo',
                'Location' => 'Localhost',
                'Reason' => 'Demo Signature'
            ]
        ]);

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
