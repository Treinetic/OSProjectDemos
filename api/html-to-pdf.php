<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    // Check if HTML content is provided
    $html = $_POST['html'] ?? null;
    $url = $_POST['url'] ?? null;

    if (!$html && !$url) {
        throw new Exception("Please provide HTML content or a URL.");
    }

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'converted_html.pdf';

    // Explicitly point to Chrome binary on macOS
    $chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

    // Check if driver class exists and instantiate with path
    if (class_exists(\ImalH\PDFLib\Drivers\ChromeHeadlessDriver::class)) {
        $driver = new \ImalH\PDFLib\Drivers\ChromeHeadlessDriver($chromePath);
        // Use the driver directly or wrap in PDF class
        // $pdf = new PDF($driver);
        $pdf = new PDF($driver);
    } else {
        throw new Exception("ChromeHeadlessDriver class not found.");
    }

    if ($html) {
        $pdf->convertFromHtml($html, $outputFile);
    } else {
        $pdf->fromUrl($url)
            ->to($outputFile)
            ->convert();
    }

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
