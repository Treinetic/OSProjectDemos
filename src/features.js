export const features = [
  {
    id: 1,
    title: "Convert PDF to Images",
    description: "Convert specific pages or the entire document to PNG or JPEG with high fidelity.",
    icon: "Image",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/convert.php",
    accept: ".pdf",
    buttonText: "Convert to Images",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('doc.pdf')
    ->to('output_dir')
    ->setOption('format', 'png')
    ->setOption('resolution', 300)
    ->convert();`
  },
  {
    id: 2,
    title: "Create PDF from Images",
    description: "Combine a list of images into a single, optimized PDF file.",
    icon: "FilePlus",
    demoType: "upload-multi", // Now supported
    endpoint: "http://localhost:8000/api/images-to-pdf.php",
    accept: "image/*", // IMPORTANT: Accept images
    buttonText: "Create PDF (Select Images)",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$images = ['img1.jpg', 'img2.jpg'];
$pdf->merge($images, 'output.pdf');`
  },
  {
    id: 3,
    title: "Compress PDF",
    description: "Reduce file size significantly using Ghostscript optimization presets.",
    icon: "Minimize2",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/compress.php",
    accept: ".pdf",
    buttonText: "Compress PDF",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
// Levels: screen, ebook, printer, prepress
$pdf->compress('large.pdf', 'opt.pdf', 'ebook');`
  },
  {
    id: 4,
    title: "Merge PDFs",
    description: "Combine multiple PDF documents into a single unified file.",
    icon: "Merge",
    demoType: "upload-multi", 
    endpoint: "http://localhost:8000/api/merge.php",
    accept: ".pdf",
    buttonText: "Merge PDFs (Upload 2+)",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$files = ['part1.pdf', 'part2.pdf'];
$pdf->merge($files, 'merged.pdf');`
  },
  {
    id: 5,
    title: "Split PDF",
    description: "Extract specific pages or ranges into new PDF files.",
    icon: "Scissors",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/split.php",
    accept: ".pdf",
    buttonText: "Split PDF (Page 1)",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('source.pdf')
    ->split('1-5', 'chapter1.pdf');`
  },
  {
    id: 6,
    title: "Encrypt & Protect",
    description: "Secure your PDFs with passwords and permission restrictions.",
    icon: "Lock",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/encrypt.php",
    accept: ".pdf",
    buttonText: "Encrypt PDF",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('source.pdf')
    ->encrypt('userPass', 'ownerPass', 'protected.pdf');`
  },
  {
    id: 7,
    title: "Watermarking",
    description: "Add text watermarks to pages for branding or security.",
    icon: "Stamp",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/watermark.php",
    accept: ".pdf",
    buttonText: "Add Watermark",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('source.pdf')
    ->watermark('CONFIDENTIAL', 'watermarked.pdf');`
  },
  {
    id: 8,
    title: "Thumbnail Generation",
    description: "Generate preview thumbnails of the first page.",
    icon: "FileImage",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/thumbnail.php",
    accept: ".pdf",
    buttonText: "Generate Thumbnail",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('source.pdf')
    ->thumbnail('thumb.jpg', 200);`
  },
  {
    id: 9,
    title: "Version Conversion",
    description: "Convert PDFs to specific versions for compatibility.",
    icon: "RefreshCw",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/version.php",
    accept: ".pdf",
    buttonText: "Convert to v1.4",
    code: `// Feature deprecated in v3.1
// Please check documentation for alternatives.`
  },
  {
    id: 10,
    title: "Metadata Management",
    description: "Read and write PDF metadata properties.",
    icon: "Tag",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/metadata.php",
    accept: ".pdf",
    buttonText: "Update Metadata",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('source.pdf')
    ->setMetadata([
        'Title' => 'Report',
        'Author' => 'Me'
    ], 'meta.pdf');`
  },
  {
    id: 11,
    title: "Page Rotation",
    description: "Rotate pages by 90, 180, or 270 degrees.",
    icon: "RotateCw",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/rotate.php",
    accept: ".pdf",
    buttonText: "Rotate 90°",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('source.pdf')
    ->rotate(90, 'rotated.pdf');`
  },
  {
    id: 12,
    title: "Form Flattening",
    description: "Make interactive form fields permanent and non-editable.",
    icon: "Layout",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/flatten.php",
    accept: ".pdf",
    buttonText: "Flatten Forms",
    code: `use ImalH\\PDFLib\\PDF;
$pdf = PDF::init();
$pdf->from('form.pdf')
    ->flatten('flat.pdf');`
  },
  {
    id: 13,
    title: "PDF/A Conversion",
    description: "Convert to PDF/A standards for long-term archiving.",
    icon: "Archive",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/pdfa.php",
    accept: ".pdf",
    buttonText: "Convert to PDF/A",
    code: `// Feature deprecated in v3.1
// PDF/A conversion requires specialized driver config.`
  },
  {
    id: 14,
    title: "OCR",
    description: "Extract text from scanned documents using Tesseract.",
    icon: "ScanText",
    demoType: "upload",
    endpoint: "http://localhost:8000/api/ocr.php",
    accept: ".pdf",
    buttonText: "Perform OCR (English)",
    code: `use ImalH\\PDFLib\\PDF;
use ImalH\\PDFLib\\Drivers\\TesseractDriver;

// OCR requires explicit Tesseract driver
$pdf = new PDF(new TesseractDriver());
$pdf->from('scanned.pdf')
    ->ocr('searchable.pdf');`
  }
];
