<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;

try {
    $paths = handleUpload('image');
    $source = $paths[0];

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'crop.jpg';

    $img = new Image($source);
    // Center crop 300x300
    $w = $img->getWidth();
    $h = $img->getHeight();
    $cropSize = min($w, $h, 300);
    $x = ($w - $cropSize) / 2;
    $y = ($h - $cropSize) / 2;

    $img->crop($x, $y, $cropSize, $cropSize);
    $img->save($outputFile);

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
