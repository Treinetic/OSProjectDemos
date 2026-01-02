<?php
require_once 'utils.php';

try {
    // Feature removed/stubbed in previous version (returned true doing nothing).
    // In v3.1 it is officially deprecated/removed until proper driver support.
    jsonResponse(['success' => false, 'error' => "PDF/A conversion is not supported in this version."], 400);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
