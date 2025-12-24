<?php
// Common functionality for Image Artist
require_once __DIR__ . '/../utils.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Treinetic\ImageArtist\lib\Image;
use Treinetic\ImageArtist\lib\Text\Color;
use Treinetic\ImageArtist\lib\Shapes\PolygonShape;

function getImageJobDir()
{
    $id = uniqid();
    $dir = __DIR__ . '/../output/' . $id . '/';
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
    return [$dir, $id];
}
