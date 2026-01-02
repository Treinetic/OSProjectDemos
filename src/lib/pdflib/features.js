const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:8000';

export const features = [
  {
    id: 1,
    title: "Convert PDF to Images",
    description: "Convert specific pages or the entire document to PNG or JPEG with high fidelity.",
    icon: "Image",
    demoType: "upload",
    endpoint: `${API_BASE}/api/convert.php`,
    accept: ".pdf",
    buttonText: "Convert to Images",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('doc.pdf')
    ->to('output')
    ->convert();`
  },
  {
    id: 2,
    title: "Create PDF from Images",
    description: "Combine a list of images into a single, optimized PDF file.",
    icon: "FilePlus",
    demoType: "upload-multi", // Now supported
    endpoint: `${API_BASE}/api/images-to-pdf.php`,
    accept: "image/*", // IMPORTANT: Accept images
    buttonText: "Create PDF (Select Images)",
    code: `$pdf = new TCPDF();
$pdf->AddPage();
$pdf->Image('img1.jpg', 0, 0, 210, 297);
$pdf->Output('output.pdf', 'F');`
  },
  {
    id: 3,
    title: "Compress PDF",
    description: "Reduce file size significantly using Ghostscript optimization presets.",
    icon: "Minimize2",
    demoType: "upload",
    endpoint: `${API_BASE}/api/compress.php`,
    accept: ".pdf",
    buttonText: "Compress PDF",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->compress('large.pdf', 'opt.pdf');`
  },
  {
    id: 4,
    title: "Merge PDFs",
    description: "Combine multiple PDF documents into a single unified file.",
    icon: "Merge",
    demoType: "upload-multi", 
    endpoint: `${API_BASE}/api/merge.php`,
    accept: ".pdf",
    buttonText: "Merge PDFs (Upload 2+)",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->merge(['file1.pdf', 'file2.pdf'], 'merged.pdf');`
  },
  {
    id: 5,
    title: "Split PDF",
    description: "Extract specific pages or ranges into new PDF files.",
    icon: "Scissors",
    demoType: "upload",
    endpoint: `${API_BASE}/api/split.php`,
    accept: ".pdf",
    buttonText: "Split PDF (Page 1)",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('source.pdf')
    ->split('1-5', 'chapter1.pdf');`
  },
  {
    id: 6,
    title: "Encrypt & Protect",
    description: "Secure your PDFs with passwords and permission restrictions.",
    icon: "Lock",
    demoType: "upload",
    endpoint: `${API_BASE}/api/encrypt.php`,
    accept: ".pdf",
    buttonText: "Encrypt PDF",
    code: `$pdfLib = new PDFLib();
$pdfLib->encrypt(
    'userPass', 
    'ownerPass', 
    'protected.pdf', 
    'source.pdf'
);`
  },
  {
    id: 7,
    title: "Watermarking",
    description: "Add text watermarks to pages for branding or security.",
    icon: "Stamp",
    demoType: "upload",
    endpoint: `${API_BASE}/api/watermark.php`,
    accept: ".pdf",
    buttonText: "Add Watermark",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('source.pdf')
    ->watermark('CONFIDENTIAL', 'watermarked.pdf');`
  },
  {
    id: 8,
    title: "Thumbnail Generation",
    description: "Generate preview thumbnails of the first page.",
    icon: "FileImage",
    demoType: "upload",
    endpoint: `${API_BASE}/api/thumbnail.php`,
    accept: ".pdf",
    buttonText: "Generate Thumbnail",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('source.pdf')
    ->to('thumb.jpg')
    ->createThumbnail(200);`
  },
  {
    id: 9,
    title: "Version Conversion",
    description: "Convert PDFs to specific versions for compatibility.",
    icon: "RefreshCw",
    demoType: "upload",
    endpoint: `${API_BASE}/api/version.php`,
    accept: ".pdf",
    buttonText: "Convert to v1.4",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('source.pdf')
    ->convertToVersion('1.4', 'compat.pdf');`
  },
  {
    id: 10,
    title: "Metadata Management",
    description: "Read and write PDF metadata properties.",
    icon: "Tag",
    demoType: "upload",
    endpoint: `${API_BASE}/api/metadata.php`,
    accept: ".pdf",
    buttonText: "Update Metadata",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('source.pdf')
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
    endpoint: `${API_BASE}/api/rotate.php`,
    accept: ".pdf",
    buttonText: "Rotate 90°",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('source.pdf')
    ->rotateAll(90, 'rotated.pdf');`
  },
  {
    id: 12,
    title: "Form Flattening",
    description: "Make interactive form fields permanent and non-editable.",
    icon: "Layout",
    demoType: "upload",
    endpoint: `${API_BASE}/api/flatten.php`,
    accept: ".pdf",
    buttonText: "Flatten Forms",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('form.pdf')
    ->flatten('flat.pdf');`
  },
  {
    id: 13,
    title: "PDF/A Conversion",
    description: "Convert to PDF/A standards for long-term archiving.",
    icon: "Archive",
    demoType: "upload",
    endpoint: `${API_BASE}/api/pdfa.php`,
    accept: ".pdf",
    buttonText: "Convert to PDF/A",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('source.pdf')
    ->convertToPDFA('archive.pdf');`
  },
  {
    id: 14,
    title: "OCR",
    description: "Extract text from scanned documents using Tesseract.",
    icon: "ScanText",
    demoType: "upload",
    endpoint: `${API_BASE}/api/ocr.php`,
    accept: ".pdf",
    buttonText: "Perform OCR (English)",
    code: `PDF::init()
    ->driver(PDF::DRIVER_TESSERACT)
    ->from('scanned.pdf')
    ->ocr('searchable.pdf');`
  },
  {
    id: 15,
    title: "HTML to PDF",
    description: "Convert HTML content or URLs to PDF using Chrome Headless.",
    icon: "Globe",
    demoType: "text-input", // Need a text input for HTML/URL? Or just a simple demo?
    // The current UI supports 'upload', 'upload-multi'. 
    // If I use 'text-input' it might break if UI component doesn't handle it.
    // Let's check App.jsx or FeatureCard to see what demoTypes are supported.
    // Assuming 'upload' is safe fallback, but for HTML we want text.
    // If UI doesn't support it, I might need to update UI component too.
    // For now, let's stick to 'upload' for consistency or add a new type.
    // The instructions said "In your demo... each box has a small code demonstration...". 
    // I should check if I need to add UI support.
    // Re-reading 'demopagerules.md' might help but I don't want to burn steps.
    // Let's assume 'input' support is needed. 
    // Actually, for HTML-to-PDF, let's provide a "Demo HTML" button using 'action' type?
    // Let's use 'html-demo' and I will check UI code next.
    demoType: "html-input", 
    endpoint: `${API_BASE}/api/html-to-pdf.php`,
    accept: "",
    buttonText: "Convert HTML",
    code: `PDF::init()
    ->driver(PDF::DRIVER_CHROME)
    ->convertFromHtml('<h1>Hello</h1>', 'out.pdf');`
  },
  {
    id: 16,
    title: "Redaction",
    description: "Permanently remove sensitive text from PDFs.",
    icon: "EyeOff",
    demoType: "upload-text", // Upload PDF + Text to redact
    endpoint: `${API_BASE}/api/redact.php`,
    accept: ".pdf",
    buttonText: "Redact Text",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('doc.pdf')
    ->redact('Confidential', 'clean.pdf');`
  },
  {
    id: 17,
    title: "Digital Signature",
    description: "Sign PDFs using OpenSSL certificates.",
    icon: "PenTool",
    demoType: "upload",
    endpoint: `${API_BASE}/api/sign.php`,
    accept: ".pdf",
    buttonText: "Sign PDF",
    code: `PDF::init()
    ->driver(PDF::DRIVER_OPENSSL)
    ->from('doc.pdf')
    ->sign('cert.crt', 'key.pem', 'signed.pdf');`
  },
  {
    id: 18,
    title: "Fill Form (Interactive)",
    description: "Inspect and fill PDF forms.",
    icon: "Edit3",
    demoType: "form-inspector", // New type
    endpoint: `${API_BASE}/api/fill-form.php`,
    inspectEndpoint: `${API_BASE}/api/inspect-form.php`, // New prop
    accept: ".pdf",
    buttonText: "Fill Form",
    code: `PDF::init()
    ->driver(PDF::DRIVER_PDFTK)
    ->from('form.pdf')
    ->fillForm($data, 'filled.pdf');`
  },
  {
    id: 19,
    title: "Chained Operations",
    description: "Rotate + Watermark in a single fluent chain.",
    icon: "Layers",
    demoType: "upload",
    endpoint: `${API_BASE}/api/chain.php`,
    accept: ".pdf",
    buttonText: "Run Chain",
    code: `PDF::init()
    ->driver(PDF::DRIVER_GHOSTSCRIPT)
    ->from('doc.pdf')
    ->rotate(90)
    ->watermark('CHAINED')
    ->save('output.pdf');`
  },
  {
    id: 20,
    title: "Get Form Fields (JSON)",
    description: "Extract form fields and view them as raw JSON data.",
    icon: "Code",
    demoType: "json-viewer",
    endpoint: `${API_BASE}/api/get-fields.php`,
    accept: ".pdf",
    buttonText: "Get Fields (JSON)",
    code: `PDF::init()
    ->driver(PDF::DRIVER_PDFTK)
    ->from('form.pdf')
    ->getFormFields();`
  }
];
