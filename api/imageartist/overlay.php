<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;
use Treinetic\ImageArtist\lib\Overlays\Overlay;
use Treinetic\ImageArtist\lib\Text\Color;

try {
    $paths = handleUpload('image');
    $source = $paths[0];

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'overlay.jpg';

    $img = new Image($source);

    // Add a dark semi-transparent overlay
    $overlay = new Overlay($img->getWidth(), $img->getHeight(), new Color(236, 72, 153, 50)); // Pink tint
    $img->merge($overlay, 0, 0);

    $img->save($outputFile);

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
