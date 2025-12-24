<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;
use Treinetic\ImageArtist\lib\Shapes\CircularShape;
use Treinetic\ImageArtist\lib\Shapes\Triangle;
use Treinetic\ImageArtist\lib\Shapes\Square;

try {
    $paths = handleUpload('image');
    $source = $paths[0];
    $shapeType = $_POST['shape'] ?? 'circle';

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'shape.png'; // PNG for transparency

    // ImageArtist Shape classes usually take the image path in constructor
    if ($shapeType === 'circle') {
        $shape = new CircularShape($source);
        $shape->build();
        $shape->save($outputFile, IMAGETYPE_PNG);
    } elseif ($shapeType === 'triangle') {
        $shape = new Triangle($source);
        // Default triangle points often needed? 
        // README says: $triangle->setPointA... but maybe defaults exist?
        // Let's use defaults or set basic ones
        $shape->build();
        $shape->save($outputFile, IMAGETYPE_PNG);
    } else {
        $shape = new Square($source);
        $shape->build();
        $shape->save($outputFile, IMAGETYPE_PNG);
    }

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
