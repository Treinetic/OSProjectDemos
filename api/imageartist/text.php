<?php
require_once 'common.php';
use Treinetic\ImageArtist\lib\Image;
use Treinetic\ImageArtist\lib\Text\TextBox;
use Treinetic\ImageArtist\lib\Text\Color;
use Treinetic\ImageArtist\lib\Text\Font;

try {
    $paths = handleUpload('image');
    $source = $paths[0];
    $text = $_POST['text'] ?? 'Antigravity';

    list($jobDir, $jobId) = getImageJobDir();
    $outputFile = $jobDir . 'text.jpg';

    $img = new Image($source);

    $textBox = new TextBox(200, 50);
    $textBox->setColor(new Color(255, 255, 255));
    // Try to use bundled font if available, or skip setFont to rely on default?
    // The library likely needs the font file present.
    // If this crashes, we can try-catch.
    try {
        $textBox->setFont(Font::getFont(Font::$NOTOSERIF_REGULAR));
    } catch (Exception $e) {
        // Fallback or ignore
    }

    $textBox->setSize(20);
    $textBox->setMargin(2);
    $textBox->setText($text);

    $img->setTextBox($textBox, 20, 20);
    $img->save($outputFile);

    jsonResponse([
        'success' => true,
        'url' => outputUrl($jobId, $outputFile)
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
