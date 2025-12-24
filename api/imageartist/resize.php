<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;

try {
    $paths = handleUpload('image');
    $source = $paths[0];

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'resize.jpg';

    $img = new Image($source);
    $img->resize(400, 300); // Demo fixed resize
    $img->save($outputFile);

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
