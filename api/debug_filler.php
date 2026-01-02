<?php
require_once __DIR__ . '/../vendor/autoload.php';

use ImalH\PDFLib\PDF;
use ImalH\PDFLib\Drivers\PdftkDriver;

$source = __DIR__ . '/uploads/6957854d4f67d_Sample-Fillable-PDF.pdf';
$dest = __DIR__ . '/output/debug_filled.pdf';

echo "Source: $source\n";

if (!file_exists($source)) {
    die("Source file not found!\n");
}

try {
    $driver = new PdftkDriver();
    $pdf = new PDF($driver);
    $pdf->from($source);

    // 1. Get Fields
    echo "Inspecting fields...\n";
    $fields = $pdf->getFormFields($source);
    print_r($fields);

    if (empty($fields)) {
        die("No fields found!\n");
    }

    // 2. Prepare Data
    $data = [];
    $firstField = is_array($fields[0]) ? $fields[0]['name'] : $fields[0]; // Handle object or string
    $data[$firstField] = "DEBUG_VALUE_123";

    // Add some common test names just in case
    $data['Given Name Text Box'] = "DEBUG_NAME";
    $data['Family Name Text Box'] = "DEBUG_FAMILY";

    echo "Filling with data: " . print_r($data, true) . "\n";

    // 3. Fill Form
    $result = $pdf->fillForm($data, $dest);

    if ($result) {
        echo "Fill successful! Output at: $dest\n";
    } else {
        echo "Fill function returned false.\n";
    }

} catch (Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
}
