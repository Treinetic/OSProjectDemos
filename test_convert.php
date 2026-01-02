<?php
require_once 'vendor/autoload.php';
use ImalH\PDFLib\PDF;

echo "Starting conversion test...\n";

$source = __DIR__ . '/sample.pdf';
if (!file_exists($source)) {
    die("Sample PDF not found!\n");
}

$outputDir = __DIR__ . '/api/output/test_job/';
if (!file_exists($outputDir))
    mkdir($outputDir, 0777, true);

$pdf = PDF::init();
$pdf->from($source);
$pdf->to($outputDir);
$pdf->setOption('format', 'png');
$pdf->setOption('resolution', 150);

echo "Calling convert()...\n";
try {
    $result = $pdf->convert();
    echo "Conversion returned: " . json_encode($result) . "\n";

    if (empty($result)) {
        echo "FAILED: Result is empty.\n";
    } else {
        echo "SUCCESS: Created " . count($result) . " images.\n";
    }
} catch (Exception $e) {
    echo "EXCEPTION: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
