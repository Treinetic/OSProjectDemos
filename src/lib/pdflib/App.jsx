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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && feature.demoType !== 'no-upload') return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    if (feature.demoType === 'upload-multi' && file.length) {
      for (let i = 0; i < file.length; i++) {
        formData.append('pdf[]', file[i]);
      }
    } else {
      formData.append('pdf', file);
    }

    // Add extra params if needed
    if (feature.id === 11) { // Rotate
      formData.append('degrees', 90);
    }

    // Capture custom inputs (Single)
    if (feature.customInput) {
      const el = e.target.elements[feature.customInput.name];
      // If textarea or text input
      formData.append(feature.customInput.name, el.value);
    }

    // Capture Multiple Custom Inputs
    if (feature.customInputs) {
      feature.customInputs.forEach(input => {
        const el = e.target.elements[input.name];
        if (input.type === 'file') {
          if (el.files[0]) {
            formData.append(input.name, el.files[0]);
          }
        } else {
          formData.append(input.name, el.value);
        }
      });
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
            {/* Main File Upload (for standard demo types) */}
            {feature.demoType !== 'no-upload' && (
              <div className="upload-zone">
                <input
                  type="file"
                  className="upload-input"
                  accept={feature.accept}
                  multiple={feature.demoType === 'upload-multi'}
                  onChange={(e) => setFile(feature.demoType === 'upload-multi' ? e.target.files : e.target.files[0])}
                />
                <div style={{ pointerEvents: 'none' }}>
                  <Icons.UploadCloud size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {file ? (
                      feature.demoType === 'upload-multi' && file.length
                        ? `${file.length} files selected`
                        : file.name
                    ) : 'Click or Drag PDF Here'}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {feature.demoType === 'upload-multi' ? 'Supports multiple files' : 'Maximum file size 10MB'}
                  </div>
                </div>
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

            {/* Configured Single Custom Input */}
            {feature.customInput && (
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  {feature.customInput.label}
                </label>
                {feature.customInput.type === 'textarea' ? (
                  <textarea
                    name={feature.customInput.name}
                    placeholder={feature.customInput.placeholder}
                    defaultValue={feature.customInput.defaultValue}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', minHeight: '100px', fontFamily: 'monospace' }}
                    required
                  />
                ) : (
                  <input
                    type={feature.customInput.type}
                    name={feature.customInput.name}
                    placeholder={feature.customInput.placeholder}
                    className="upload-input" // Reusing style for now
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                    required
                  />
                )}
              </div>
            )}

            {/* Configured Multiple Custom Inputs (e.g. key/cert files) */}
            {feature.customInputs && feature.customInputs.map((input, idx) => (
              <div key={idx} className="form-group" style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  accept={input.accept}
                  placeholder={input.placeholder}
                  className={input.type === 'file' ? 'upload-input-simple' : 'upload-input'}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                // For files, we don't bind value, we handle via name in onSubmit
                />
              </div>
            ))}

            <button
              type="submit"
              className="action-btn"
              disabled={(!file && feature.demoType !== 'no-upload') || loading}
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
