<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;

try {
    $paths = handleUpload('image');
    $source = $paths[0];

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'flip.jpg';

    $img = new Image($source);
    $img->flipH();
    $img->save($outputFile);

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
