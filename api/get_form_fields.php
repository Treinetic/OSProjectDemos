<?php
require_once 'utils.php';
use ImalH\PDFLib\PDF;
use ImalH\PDFLib\Drivers\PdftkDriver;

try {
    $paths = handleUpload('pdf');
    $source = $paths[0];

    // Use LocalPdftkDriver for form inspection (Bug fix workaround)
    require_once 'LocalPdftkDriver.php';
    $pdf = new PDF(new LocalPdftkDriver());

    // Note: getFormFields in Facade might accept source OR assume loaded check.
    // Based on my view of PDF.php: public function getFormFields(string $source = null)
    // It calls driver->getFormFields($source).
    // So we pass source explicitly or let it use default?
    // PDF.php line 225: if ($source) return this->driver->getFormFields($source)
    // But PDF::from($path) sets originalSource (line 41).
    // But getFormFields (line 222) expects source arg or fails?
    // It throws InvalidArgumentException if !$source.
    // So we MUST pass source to getFormFields.

    $fields = $pdf->getFormFields($source);

    // This returns array of strings.

    // No "jobDir" needed for output file, but we return JSON.

    jsonResponse([
        'success' => true,
        'json_result' => $fields
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
