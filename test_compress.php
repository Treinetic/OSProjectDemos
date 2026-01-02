<?php
require_once 'vendor/autoload.php';
use ImalH\PDFLib\PDF;

echo "Starting compression test...\n";

$source = __DIR__ . '/sample.pdf';
if (!file_exists($source)) {
    die("Sample PDF not found!\n");
}

$outputDir = __DIR__ . '/api/output/test_job_c/';
if (!file_exists($outputDir))
    mkdir($outputDir, 0777, true);
$outputFile = $outputDir . 'compressed.pdf';

$pdf = PDF::init();

echo "Calling compress()...\n";
try {
    $result = $pdf->compress($source, $outputFile); // defaults to screen

    if ($result) {
        echo "SUCCESS: Compressed to $outputFile\n";
    } else {
        echo "FAILED: compress returned false.\n";
    }
} catch (Exception $e) {
    echo "EXCEPTION: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
