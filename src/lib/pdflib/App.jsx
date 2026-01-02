import React, { useState } from 'react';
import * as Icons from 'lucide-react';
// Import the manually defined CSS
import '../../index.css';
import { features } from './features';

const IconComponent = ({ name, size = 24 }) => {
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon size={size} />;
};

export default function App() {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="max-w-container nav-content">
          <div className="logo">
            <div className="logo-icon">P</div>
            <span>PDFLib v2.0</span>
          </div>
          <a
            href="https://github.com/imalhasaranga/PDFLib"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--text-muted)' }}
          >
            <Icons.Github size={24} />
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="max-w-container">
            <h1 className="hero-title">
              Modern PDF Manipulation<br />
              for PHP Developers
            </h1>
            <p className="hero-subtitle">
              A robust, fluent library powered by Ghostscript.
              Convert, merge, split, and optimize PDFs with a simple, clean API.
            </p>

            <div className="install-box">
              <span className="cmd-prefix">$</span>
              composer require imal-h/pdf-box
              <Icons.Copy
                size={16}
                style={{ cursor: 'pointer', marginLeft: 'auto' }}
                onClick={() => navigator.clipboard.writeText('composer require imal-h/pdf-box')}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-container">
          <h2 className="section-title">Features</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
            Explore the capabilities of PDFLib v2.0
          </p>

          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="card">
                <div className="card-icon">
                  <IconComponent name={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <div className="code-block">
                  <pre>{feature.code}</pre>
                </div>

                {feature.demoType ? (
                  <button
                    className="demo-btn"
                    onClick={() => setActiveFeature(feature)}
                  >
                    <Icons.Play size={16} /> Try Live Demo
                  </button>
                ) : (
                  <div className="pending-badge">
                    Demo coming soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      {activeFeature && (
        <DemoModal
          feature={activeFeature}
          onClose={() => setActiveFeature(null)}
        />
      )}
    </div>
  );
}

function DemoModal({ feature, onClose }) {
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [formFields, setFormFields] = useState(null); // { name: value }
  const [loading, setLoading] = useState(false);
  const [inspecting, setInspecting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isForm, setIsForm] = useState(true); // Assume true initially

  // Inspect form when file is selected
  const handleFileChange = async (e) => {
    const selectedFile = feature.demoType === 'upload-multi' ? e.target.files : e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    setError(null);
    setFormFields(null);
    setIsForm(true);

    if (feature.demoType === 'form-inspector' && selectedFile) {
      setInspecting(true);
      const fd = new FormData();
      fd.append('pdf', selectedFile);

      try {
        const res = await fetch(feature.inspectEndpoint, { method: 'POST', body: fd });
        const data = await res.json();

        if (data.success) {
          if (data.is_form && data.fields && data.fields.length > 0) {
            // Initialize fields
            const initialFields = {};
            data.fields.forEach(f => initialFields[f.FieldName] = '');
            setFormFields(initialFields);
          } else {
            setIsForm(false);
          }
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        setError("Inspection failed: " + err.message);
      } finally {
        setInspecting(false);
      }
    }
  };

  const handleFieldChange = (name, value) => {
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feature.demoType === 'html-input' && !textInput) return;
    if (feature.demoType !== 'html-input' && !file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    if (feature.demoType === 'upload-multi' && file.length) {
      for (let i = 0; i < file.length; i++) {
        formData.append('pdf[]', file[i]);
      }
    } else if (file) {
      formData.append('pdf', file);
    }

    // Handle text inputs
    if (feature.demoType === 'html-input') {
      formData.append('html', textInput);
    }
    if (feature.demoType === 'upload-text') {
      formData.append('text', textInput);
    }

    // Handle Form Data
    if (feature.demoType === 'form-inspector' && formFields) {
      formData.append('data', JSON.stringify(formFields));
    }

    // Add extra params if needed
    if (feature.id === 11) { // Rotate
      formData.append('degrees', 90);
    }

    try {
      const response = await fetch(feature.endpoint, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Operation failed');

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <IconComponent name={feature.icon} size={24} />
            {feature.title} Demo
          </div>
          <button className="close-btn" onClick={onClose}>
            <Icons.X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* File Upload Zone - Hide for HTML Input */}
            {feature.demoType !== 'html-input' && (
              <div className="upload-zone">
                <input
                  type="file"
                  className="upload-input"
                  accept={feature.accept}
                  multiple={feature.demoType === 'upload-multi'}
                  onChange={handleFileChange}
                />
                <div style={{ pointerEvents: 'none' }}>
                  <Icons.UploadCloud size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {file ? (
                      feature.demoType === 'upload-multi' && file.length
                        ? `${file.length} files selected`
                        : file.name
                    ) : feature.demoType === 'form-inspector' ? 'Upload PDF Form to Inspect' : 'Click or Drag PDF Here'}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {feature.demoType === 'upload-multi' ? 'Supports multiple files' : 'Maximum file size 10MB'}
                  </div>
                </div>
              </div>
            )}

            {/* Form Inspection Loading */}
            {inspecting && (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
                <Icons.Loader2 className="animate-spin" size={20} /> Inspecting Form...
              </div>
            )}

            {/* Form Fields Inputs */}
            {feature.demoType === 'form-inspector' && !inspecting && file && (
              <div style={{ marginTop: '1rem' }}>
                {!isForm ? (
                  <div style={{ padding: '0.75rem', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', borderRadius: '8px', fontSize: '0.9rem' }}>
                    <Icons.AlertTriangle size={16} style={{ display: 'inline', marginRight: '5px' }} />
                    This PDF does not appear to have fillable form fields.
                  </div>
                ) : formFields && Object.keys(formFields).length > 0 ? (
                  <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Fill Fields:</h4>
                    {Object.keys(formFields).map(field => (
                      <div key={field} style={{ marginBottom: '0.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem', color: 'var(--text-muted)' }}>{field}</label>
                        <input
                          type="text"
                          className="text-input"
                          value={formFields[field]}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}

            {/* HTML Input Area */}
            {feature.demoType === 'html-input' && (
              <div className="input-group" style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>HTML Content</label>
                <textarea
                  className="text-input"
                  rows={6}
                  placeholder="<h1>Hello World</h1>"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onFocus={() => {
                    if (!textInput) setTextInput(`<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 20px; }
  h1 { color: #333; }
  .box { background: #f0f0f0; padding: 10px; border-radius: 5px; }
</style>
</head>
<body>
  <h1>Hello from PDFLib</h1>
  <div class="box">
    <p>This is a sample HTML content ready to be converted.</p>
    <p>Edit me to test!</p>
  </div>
</body>
</html>`);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--foreground)',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            )}

            {/* Redaction Text Input */}
            {feature.demoType === 'upload-text' && (
              <div className="input-group" style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Text to Redact</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="e.g. Confidential"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--foreground)'
                  }}
                />
              </div>
            )}

            {/* Hint for Encryption Demo */}
            {feature.id === 6 && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'var(--accent)'
              }}>
                <strong>Demo Passwords:</strong><br />
                User Password: <code>1234</code><br />
                Owner Password: <code>admin</code>
              </div>
            )}

            <button
              type="submit"
              className="action-btn"
              disabled={loading || (feature.demoType !== 'html-input' && !file) || (feature.demoType === 'html-input' && !textInput) || (feature.demoType === 'form-inspector' && !isForm)}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Icons.Loader2 className="animate-spin" /> Processing...
                </span>
              ) : feature.buttonText}
            </button>
          </form>

          {error && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Icons.AlertCircle size={20} />
              {error}
            </div>
          )}

          {result && (
            <div className="result-area">
              <div className="success-msg">
                <Icons.CheckCircle size={20} /> Success!
              </div>

              {/* JSON Result Viewer */}
              {feature.demoType === 'json-viewer' && (
                <div className="code-block" style={{ marginTop: '1rem', maxHeight: '300px', overflow: 'auto' }}>
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}

              {/* Image Results */}
              {result.images && (
                <div className="result-images">
                  {result.images.slice(0, 4).map((img, i) => (
                    <a key={i} href={img} target="_blank" rel="noreferrer">
                      <img src={img} alt={`Page ${i + 1}`} />
                    </a>
                  ))}
                  {result.images.length > 4 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
                      + {result.images.length - 4} more pages
                    </div>
                  )}
                </div>
              )}

              {/* PDF Result */}
              {result.pdf_url && (
                <a href={result.pdf_url} target="_blank" rel="noreferrer" className="download-link">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icons.FileText size={20} color="var(--primary)" />
                    <span>{result.pdf_url.split('/').pop()}</span>
                  </div>
                  <Icons.Download size={20} />
                </a>
              )}

              {/* Single Image Result */}
              {result.image_url && (
                <div style={{ textAlign: 'center' }}>
                  <img src={result.image_url} alt="Result" style={{ maxHeight: '200px', borderRadius: '8px', marginBottom: '1rem' }} />
                  <br />
                  <a href={result.image_url} target="_blank" rel="noreferrer" className="download-link">
                    Download Image <Icons.Download size={16} />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
