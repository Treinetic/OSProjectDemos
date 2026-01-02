<?php
require_once 'vendor/autoload.php';
use ImalH\PDFLib\PDF;
use ImalH\PDFLib\Drivers\ChromeHeadlessDriver;

echo "Starting HTML to PDF test...\n";

// Logic from html_to_pdf.php
$chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // Mac Default
if (!file_exists($chromePath)) {
    // Fallback checks
    $possiblePaths = [
        '/usr/bin/chromium',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser'
    ];
    foreach ($possiblePaths as $p) {
        if (file_exists($p)) {
            $chromePath = $p;
            break;
        }
    }
}

echo "Detected Chrome Path: $chromePath\n";

if (!file_exists($chromePath)) {
    die("FAILED: Chrome binary not found.\n");
}

try {
    $pdf = new PDF(new ChromeHeadlessDriver($chromePath));
    // Test simple conversion
    $outputDir = __DIR__ . '/api/output/test_job_html/';
    if (!file_exists($outputDir))
        mkdir($outputDir, 0777, true);
    $outputFile = $outputDir . 'test.pdf';

    $html = "<html><body><h1>Hello World</h1><p>Testing PDFLib HTML conversion.</p></body></html>";

    // We need to use valid method.
    // Facade inspection earlier: convertFromHtml($html, $dest)
    // But wait, in step 83 I saw: 
    // $pdf = new PDF(...)
    // $pdf->convertFromHtml($html, $outputFile);
    // Let's verify if that method exists on PDF class or if it delegates?
    // PDF.php line 195: public function convertFromHtml(string $html, string $destination): bool

    $result = $pdf->convertFromHtml($html, $outputFile);

    if ($result && file_exists($outputFile)) {
        echo "SUCCESS: Created $outputFile\n";
    } else {
        echo "FAILED: Conversion returned false or file missing.\n";
    }

} catch (Exception $e) {
    echo "EXCEPTION: " . $e->getMessage() . "\n";
}
