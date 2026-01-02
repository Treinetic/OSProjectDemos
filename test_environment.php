<?php
echo "Checking Ghostscript...\n";
$gs = shell_exec('gs --version 2>&1');
if ($gs) {
    echo "Ghostscript found: $gs\n";
} else {
    echo "Ghostscript NOT looking good.\n";
}

echo "\nChecking PDFtk...\n";
$pdftk = shell_exec('pdftk --version 2>&1');
if ($pdftk) {
    echo "PDFtk found: " . substr($pdftk, 0, 100) . "...\n";
} else {
    echo "PDFtk NOT found.\n";
}
