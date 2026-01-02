<?php

require_once __DIR__ . '/../vendor/autoload.php';

use ImalH\PDFLib\Drivers\PdftkDriver;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class LocalPdftkDriver extends PdftkDriver
{
    /**
     * FIX: Implement getNumberOfPages using metadata
     */
    public function getNumberOfPages(string $s): int
    {
        $meta = $this->getMetadata($s);
        if (isset($meta['NumberOfPages'])) {
            return (int) $meta['NumberOfPages'];
        }
        throw new \RuntimeException("Could not determine page count via Pdftk.");
    }

    /**
     * FIX: Correct fillForm command to include 'flatten'
     */
    public function fillForm(array $data, string $destination): bool
    {
        if (!file_exists($this->source)) {
            throw new \RuntimeException("Source file not found: " . $this->source);
        }

        // Access private method generateFdf using reflection or copy logic?
        // generateFdf is private in parent. We must duplicate it.
        $fdfContent = $this->generateFdfLocal($data);
        $fdfFile = sys_get_temp_dir() . '/form_data_' . uniqid() . '.fdf';
        file_put_contents($fdfFile, $fdfContent);

        $command = [
            'pdftk', // Assuming binary is in path, or use parent's if protected? 
            // $binaryPath is protected in parent! Good.
            $this->source,
            'fill_form',
            $fdfFile,
            'output',
            $destination,
            'flatten'
        ];

        // Use parent property if possible. 
        // We can access protected $this->binaryPath
        $command[0] = $this->binaryPath;

        try {
            $process = new Process($command);
            $process->mustRun();

            if (file_exists($fdfFile))
                unlink($fdfFile);
            return file_exists($destination);
        } catch (ProcessFailedException $e) {
            if (file_exists($fdfFile))
                unlink($fdfFile);
            throw new \RuntimeException("Pdftk failed: " . $e->getMessage());
        }
    }

    /**
     * FIX: Parse complex fields (Choice/Options)
     */
    public function getFormFields(string $source): array
    {
        if (!file_exists($source)) {
            throw new \RuntimeException("Source file not found: " . $source);
        }

        $command = [$this->binaryPath, $source, 'dump_data_fields'];

        try {
            $process = new Process($command);
            $process->mustRun();
            $output = $process->getOutput();

            return $this->parsePdftkFieldsLocal($output);
        } catch (ProcessFailedException $e) {
            throw new \RuntimeException("Pdftk failed to inspect fields: " . $e->getMessage());
        }
    }

    private function parsePdftkFieldsLocal(string $output): array
    {
        $fields = [];
        $lines = explode("\n", $output);
        $currentField = [];

        foreach ($lines as $line) {
            if (strpos($line, '---') === 0) {
                if (isset($currentField['FieldName'])) {
                    $fields[] = [
                        'name' => $currentField['FieldName'],
                        'type' => $currentField['FieldType'] ?? 'Text',
                        'options' => $currentField['Options'] ?? []
                    ];
                }
                $currentField = [];
                continue;
            }

            $parts = explode(':', $line, 2);
            if (count($parts) == 2) {
                $key = trim($parts[0]);
                $value = trim($parts[1]);

                if ($key === 'FieldStateOption') {
                    if (!isset($currentField['Options'])) {
                        $currentField['Options'] = [];
                    }
                    $currentField['Options'][] = $value;
                } else {
                    $currentField[$key] = $value;
                }
            }
        }
        if (isset($currentField['FieldName'])) {
            $fields[] = [
                'name' => $currentField['FieldName'],
                'type' => $currentField['FieldType'] ?? 'Text',
                'options' => $currentField['Options'] ?? []
            ];
        }
        return $fields;
    }

    private function generateFdfLocal(array $data): string
    {
        $fdf = "%FDF-1.2\n%\n1 0 obj\n<< \n/FDF << /Fields [ ";
        foreach ($data as $key => $value) {
            $fdf .= "<< /T (" . $this->escapePdfStringLocal($key) . ") /V (" . $this->escapePdfStringLocal($value) . ") >> \n";
        }
        $fdf .= "] \n>> \n>> \nendobj\ntrailer\n<<\n/Root 1 0 R \n\n>>\n%%EOF";
        return $fdf;
    }

    private function escapePdfStringLocal($string): string
    {
        $string = str_replace('\\', '\\\\', $string);
        $string = str_replace('(', '\\(', $string);
        $string = str_replace(')', '\\)', $string);
        return $string;
    }
}
