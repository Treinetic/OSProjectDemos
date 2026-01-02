<?php
require_once 'utils.php';

try {
    // Feature removed in v3.1
    jsonResponse(['success' => false, 'error' => "This feature is deprecated in PDFLib v3.1"], 400);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
