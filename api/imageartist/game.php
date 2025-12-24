<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;
use Treinetic\ImageArtist\lib\Shapes\CircularShape;
use Treinetic\ImageArtist\lib\Text\TextBox;
use Treinetic\ImageArtist\lib\Text\Color;
use Treinetic\ImageArtist\lib\Text\Font;

try {
    $action = $_POST['action'] ?? 'init';

    if ($action === 'init') {
        $paths = handleUpload('image');
        $imagePath = $paths[0];
    } else {
        $url = $_POST['current_image'];
        $parts = explode('/api/output/', $url);
        if (count($parts) < 2)
            throw new Exception("Invalid context");
        $relPath = $parts[1];
        // Clean URL params if any
        $relPath = explode('?', $relPath)[0];
        $imagePath = __DIR__ . '/../output/' . $relPath;
        if (!file_exists($imagePath))
            throw new Exception("Image miss: $imagePath");
    }

    list($jobDir, $jobId) = getImageJobDir();
    $filename = 'step_' . time() . '.png'; // PNG for transparency (circle)
    $outputFile = $jobDir . $filename;

    // Load Image
    // If it's circle step, we might need special handling
    $img = new Image($imagePath);

    switch ($action) {
        case 'init':
            $img->resize(800, 600);
            $img->save($outputFile, IMAGETYPE_PNG);
            break;

        case 'bw':
            imagefilter($img->getResource(), IMG_FILTER_GRAYSCALE);
            $img->save($outputFile, IMAGETYPE_PNG);
            break;

        case 'sepia':
            imagefilter($img->getResource(), IMG_FILTER_GRAYSCALE);
            imagefilter($img->getResource(), IMG_FILTER_COLORIZE, 100, 50, 0);
            $img->save($outputFile, IMAGETYPE_PNG);
            break;

        case 'square':
            $min = min($img->getWidth(), $img->getHeight());
            $img->crop(($img->getWidth() - $min) / 2, ($img->getHeight() - $min) / 2, $min, $min);
            $img->save($outputFile, IMAGETYPE_PNG);
            break;

        case 'circle':
            $circle = new CircularShape($imagePath);
            $circle->build();
            $circle->save($outputFile, IMAGETYPE_PNG);
            break;

        case 'sign_bottom':
            $textBox = new TextBox(200, 40);
            $textBox->setColor(new Color(255, 255, 255));
            $textBox->setFont(Font::getFont(Font::$NOTOSERIF_REGULAR));
            $textBox->setSize(16);
            $textBox->setText("@CreatedWithImageArtist");
            $img->setTextBox($textBox, $img->getWidth() - 210, $img->getHeight() - 50);
            $img->save($outputFile, IMAGETYPE_PNG);
            break;

        case 'sign_center':
            $textBox = new TextBox(300, 60);
            $textBox->setColor(new Color(255, 0, 0));
            $textBox->setFont(Font::getFont(Font::$NOTOSERIF_REGULAR));
            $textBox->setSize(24);
            $textBox->setText("CONFIDENTIAL");
            $img->setTextBox($textBox, ($img->getWidth() - 300) / 2, ($img->getHeight() - 60) / 2);
            $img->save($outputFile, IMAGETYPE_PNG);
            break;
    }

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
