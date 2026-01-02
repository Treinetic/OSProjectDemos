<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../vendor/autoload.php';
require_once 'utils.php';

use ImalH\PDFLib\PDF;

$uploadDir = __DIR__ . '/uploads/';
$outputDir = __DIR__ . '/output/';

if (!file_exists($uploadDir))
    mkdir($uploadDir, 0777, true);
if (!file_exists($outputDir))
    mkdir($outputDir, 0777, true);

try {
    if (!isset($_FILES['pdf'])) {
        throw new Exception('No PDF file uploaded');
    }

    $file = $_FILES['pdf'];
    $filename = uniqid() . '_' . basename($file['name']);
    $inputPath = $uploadDir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $inputPath)) {
        throw new Exception('Failed to upload file');
    }

    list($jobOutputDir, $jobId) = getJobDir();

    $pdf = PDF::init();
    $pdf->from($inputPath);
    $pdf->to($jobOutputDir);
    // v3.1 uses direct driver options
    $pdf->setOption('format', 'png');
    $pdf->setOption('resolution', 150);
    $pdf->convert();

    // Scan for generated images
    $images = glob($jobOutputDir . '/*.png');
    $imageUrls = [];
    // Base URL logic
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $baseUrl = "$protocol://$host";

    foreach ($images as $img) {
        $imageUrls[] = $baseUrl . '/api/output/' . $jobId . '/' . basename($img);
    }

    jsonResponse(['success' => true, 'images' => $imageUrls]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
