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
    code: `$pdfLib = new PDFLib();
$pdfLib->setPdfPath('doc.pdf')
    ->setOutputPath('output')
    ->setImageFormat(PDFLib::$IMAGE_FORMAT_PNG)
    ->setDPI(300)
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
    code: `$pdfLib = new PDFLib();
$images = ['img1.jpg', 'img2.jpg'];
$pdfLib->makePDF('output.pdf', $images);`
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
    code: `$pdfLib = new PDFLib();
// Levels: screen, ebook, printer, prepress
$pdfLib->compress('large.pdf', 'opt.pdf', PDFLib::$COMPRESSION_EBOOK);`
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
    code: `$pdfLib = new PDFLib();
$files = ['part1.pdf', 'part2.pdf'];
$pdfLib->merge($files, 'merged.pdf');`
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
    code: `$pdfLib = new PDFLib();
// Extract pages 1-5
$pdfLib->split('1-5', 'chapter1.pdf', 'source.pdf');`
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
    code: `$pdfLib = new PDFLib();
$pdfLib->addWatermarkText(
    'CONFIDENTIAL', 
    'watermarked.pdf', 
    'source.pdf'
);`
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
    code: `$pdfLib = new PDFLib();
$pdfLib->createThumbnail('thumb.jpg', 200, 'source.pdf');`
  },
  /* Feature 9 Removed in v3.1 */
  {
    id: 10,
    title: "Metadata Management",
    description: "Read and write PDF metadata properties.",
    icon: "Tag",
    demoType: "upload",
    endpoint: `${API_BASE}/api/metadata.php`,
    accept: ".pdf",
    buttonText: "Update Metadata",
    code: `$pdfLib = new PDFLib();
$pdfLib->setMetadata([
    'Title' => 'Report',
    'Author' => 'Me'
], 'meta.pdf', 'source.pdf');`
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
    code: `$pdfLib = new PDFLib();
$pdfLib->rotateAll(90, 'rotated.pdf', 'source.pdf');`
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
    code: `$pdfLib = new PDFLib();
$pdfLib->flatten('flat.pdf', 'form.pdf');`
  },
  /* Feature 13 Removed in v3.1 */
  {
    id: 14,
    title: "OCR",
    description: "Extract text from scanned documents using Tesseract.",
    icon: "ScanText",
    demoType: "upload",
    endpoint: `${API_BASE}/api/ocr.php`,
    accept: ".pdf",
    buttonText: "Perform OCR (English)",
    code: `$pdfLib = new PDFLib();
$pdfLib->ocr('eng', 'searchable.pdf', 'scanned.pdf');`
  },
  {
    id: 15,
    title: "Redaction",
    description: "Permanently remove sensitive text from the document.",
    icon: "Eraser",
    demoType: "upload",
    endpoint: `${API_BASE}/api/redact.php`,
    accept: ".pdf",
    buttonText: "Redact Text",
    customInput: {
      name: "redact_text",
      label: "Text to Redact",
      placeholder: "e.g., CONFIDENTIAL",
      type: "text"
    },
    code: `$pdfLib = new PDFLib();
$pdfLib->load('source.pdf')
    ->redact('CONFIDENTIAL')
    ->save('redacted.pdf');`
  },
  {
    id: 16,
    title: "Signature Validation",
    description: "Validate digital signatures within the PDF.",
    icon: "ShieldCheck",
    demoType: "upload",
    endpoint: `${API_BASE}/api/validate_signature.php`,
    accept: ".pdf",
    buttonText: "Validate Signatures",
    code: `$pdfLib = new PDFLib();
$valid = $pdfLib->load('signed.pdf')
    ->validateSignature();`
  },
  {
    id: 17,
    title: "Digital Signing",
    description: "Sign PDFs with a Certificate and Private Key.",
    icon: "PenTool",
    demoType: "upload-custom", // New type for complex inputs
    endpoint: `${API_BASE}/api/sign.php`,
    accept: ".pdf",
    buttonText: "Sign PDF",
    customInputs: [ // Array of inputs
        { name: "certificate", label: "Certificate (.crt)", type: "file", accept: ".crt" },
        { name: "private_key", label: "Private Key (.pem)", type: "file", accept: ".pem" },
        { name: "password", label: "Password (Optional)", type: "password", placeholder: "Key Password" }
    ],
    code: `$pdf = PDF::init();
$pdf->from('doc.pdf')
    ->sign('cert.crt', 'key.pem');`
  },
  {
    id: 18,
    title: "Form Filling",
    description: "Programmatically fill PDF forms using JSON data.",
    icon: "Edit3",
    demoType: "upload",
    endpoint: `${API_BASE}/api/fill_form.php`,
    accept: ".pdf",
    buttonText: "Fill Form",
    customInput: {
      name: "form_data",
      label: "Form Data (JSON)",
      placeholder: '{"Name": "John Doe", "Date": "2024-01-01"}',
      type: "textarea",
      defaultValue: '{\n  "calc_subtotal": "550",\n  "calc_total": "600",\n  "cur_date": "2026-01-02",\n  "txt_first_name": "Imal",\n  "txt_last_name": "Hasaranga"\n}'
    },
    code: `$pdf = PDF::init();
$data = ['Name' => 'John'];
$pdf->from('form.pdf')
    ->fillForm($data);`
  },
  {
    id: 19,
    title: "HTML to PDF",
    description: "Convert HTML content or URLs to PDF.",
    icon: "Globe",
    demoType: "no-upload", // No PDF upload needed
    endpoint: `${API_BASE}/api/html_to_pdf.php`,
    buttonText: "Convert HTML",
    customInput: {
      name: "html_content",
      label: "HTML Content or URL",
      placeholder: "<h1>Hello World</h1> or https://example.com",
      type: "textarea",
      defaultValue: "<h1 style='color:red;'>Hello from PDFLib!</h1>"
    },
    code: `$pdf = PDF::init();
$pdf->convertFromHtml('<h1>Hi</h1>', 'out.pdf');`
  }
];
