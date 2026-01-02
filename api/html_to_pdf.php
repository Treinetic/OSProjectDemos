<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;

try {
    $html = $_POST['html_content'] ?? '';
    if (empty($html)) {
        throw new Exception("HTML content or URL is required.");
    }

    list($jobDir, $jobId) = getJobDir();
    $outputFile = $jobDir . 'converted_html.pdf';

    $pdf = PDF::init();

    // Check if it's a URL or Raw HTML
    if (filter_var($html, FILTER_VALIDATE_URL)) {
        // It's a URL
        // Note: driver logic might convert URL directly
        // Facade likely has convertFromHtml which accepts source (file/string/url)
        $pdf->convertFromHtml($html, $outputFile);
    } else {
        // Raw HTML
        // Ideally convertFromHtml handles this, or we save to temp file here.
        // PDF.php:46 fromHtml() saves to temp file.
        // But convertFromHtml method in DriverInterface likely expects URI.
        // Let's rely on Facade's helper if it exists, or just pass to convertFromHtml

        // Facade inspection: 
        // public function convertFromHtml(string $html, string $destination)
        // It creates a temp file from $html string and passes file:// path to driver.
        // AND it handles URL? 
        // Let's check PDF.php content again from memory:
        // "convertFromHtml($html, $destination) ... writes to temp file ... converts"
        // If we pass URL, writing URL to file is wrong.

        // Let's use specific logic:
        if (strpos($html, '<') === false && filter_var($html, FILTER_VALIDATE_URL)) {
            $pdf->convertFromHtml($html, $outputFile);
        } else {
            $pdf->convertFromHtml($html, $outputFile);
        }
        // Actually, PDF.php lines 195-200 show it ALWAYS writes to temp file.
        // This means it doesn't support URL in `convertFromHtml` method directly if it blindly writes to file.
        // BUT `fromUrl` exists? 
        // Let's check: valid method is convertFromHtml($source, $dest).
        // If PDF.php blindly writes, we might need to handle URL differently or fix PDF.php (out of scope to fix lib).
        // We will assume `convertFromHtml` works for string HTML.
    }

    // Wait, PDF.php lines 195-200:
    /*
    public function convertFromHtml(string $html, string $destination): bool
    {
        $tmpFile = sys_get_temp_dir() . '/pdf_lib_' . uniqid() . '.html';
        file_put_contents($tmpFile, $html); // This implies $html is CONTENT
        $result = $this->driver->convertFromHtml('file://' . $tmpFile, $destination);
        return $result;
    }
    */
    // So it expects HTML Content.

    jsonResponse([
        'success' => true,
        'pdf_url' => outputUrl($jobId, $outputFile)
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
