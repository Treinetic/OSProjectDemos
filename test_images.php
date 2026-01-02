<?php
require_once 'vendor/autoload.php';
use ImalH\PDFLib\PDF;

echo "Starting Images to PDF test (Sips Strategy)...\n";

if (file_exists('banner.png')) {
    copy('banner.png', 'img1.png');
    copy('banner.png', 'img2.png');
    $paths = ['img1.png', 'img2.png'];
} else {
    die("banner.png not found.\n");
}

$outputDir = __DIR__ . '/api/output/test_job_img/';
if (!file_exists($outputDir))
    mkdir($outputDir, 0777, true);
$outputFile = $outputDir . 'images.pdf';

$tempPdfs = [];
$isMac = (PHP_OS_FAMILY === 'Darwin');

foreach ($paths as $idx => $img) {
    $tempPdf = $outputDir . 'temp_img_' . $idx . '.pdf';

    if ($isMac) {
        echo "Converting $img via sips...\n";
        exec("sips -s format pdf " . escapeshellarg($img) . " --out " . escapeshellarg($tempPdf));
    } else {
        // Fallback logic
    }

    if (file_exists($tempPdf)) {
        $tempPdfs[] = $tempPdf;
    }
}

if (count($tempPdfs) > 0) {
    echo "Merging " . count($tempPdfs) . " PDFs...\n";
    $pdf = PDF::init();
    $pdf->merge($tempPdfs, $outputFile);

    // Cleanup
    foreach ($tempPdfs as $tp)
        unlink($tp);

    if (file_exists($outputFile)) {
        echo "SUCCESS: Created $outputFile\n";
    } else {
        echo "FAILED: Output file not found.\n";
    }
} else {
    echo "FAILED: No temp PDFs created.\n";
}

// Cleanup
@unlink('img1.png');
@unlink('img2.png');
