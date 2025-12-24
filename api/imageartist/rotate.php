<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;

try {
    $paths = handleUpload('image');
    $source = $paths[0];
    $angle = $_POST['angle'] ?? 45;

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'rotate.jpg';

    $img = new Image($source);
    $img->rotate($angle);
    $img->save($outputFile);

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
