<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;

try {
    $paths = handleUpload('image');
    $source = $paths[0];

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'merge.jpg';

    $mainImg = new Image($source);

    // Check for uploaded secondary image
    $overlayPaths = handleUpload('image2');
    $overlayPath = $overlayPaths[0] ?? null;

    // Fallback or error handling
    if ($overlayPath && file_exists($overlayPath)) {
        $checkImg = new Image($overlayPath);
        $checkImg->resize(150, 150); // Make it small

        // Merge at bottom right
        $x = $mainImg->getWidth() - 170;
        $y = $mainImg->getHeight() - 170;

        $mainImg->merge($checkImg, $x, $y);
    } else {
        // Fallback if generic image missing?
        // Just skip merge
    }

    $mainImg->save($outputFile);

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
