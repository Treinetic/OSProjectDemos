import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Basic Icons
const IconComponent = ({ name, size = 24, className }) => {
    const Icon = Icons[name] || Icons.Image;
    return <Icon size={size} className={className} />;
};

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:8000';

const artistFeatures = [
    {
        id: 1,
        title: 'Resize',
        icon: 'Minimize',
        desc: 'Scale images to any dimension',
        endpoint: `${API_BASE}/api/imageartist/resize.php`,
        code: `$img = new Image("source.jpg");
$img->resize(400, 300);
$img->save("resized.jpg");`
    },
    {
        id: 2,
        title: 'Crop',
        icon: 'Crop',
        desc: 'Cut specific areas of an image',
        endpoint: `${API_BASE}/api/imageartist/crop.php`,
        code: `$img = new Image("source.jpg");
// x, y, width, height
$img->crop(50, 50, 300, 300);
$img->save("cropped.jpg");`
    },
    {
        id: 3,
        title: 'Rotate',
        icon: 'RotateCw',
        desc: 'Rotate images by degrees',
        endpoint: `${API_BASE}/api/imageartist/rotate.php`,
        code: `$img = new Image("source.jpg");
$img->rotate(90);
$img->save("rotated.jpg");`
    },
    {
        id: 4,
        title: 'Flip',
        icon: 'FlipHorizontal',
        desc: 'Mirror images horizontally/vertically',
        endpoint: `${API_BASE}/api/imageartist/flip.php`,
        code: `$img = new Image("source.jpg");
$img->flipH(); // or flipV()
$img->save("flipped.jpg");`
    },
    {
        id: 5,
        title: 'Text Watermark',
        icon: 'Type',
        desc: 'Add branded text overlays',
        endpoint: `${API_BASE}/api/imageartist/text.php`,
        code: `$img = new Image("source.jpg");
$box = new TextBox(200, 50);
$box->setText("Treinetic");
$img->setTextBox($box, 20, 20);
$img->save("result.jpg");`
    },
    {
        id: 6,
        title: 'Image Watermark',
        icon: 'Image',
        desc: 'Overlay logos or other images',
        endpoint: `${API_BASE}/api/imageartist/overlay.php`,
        code: `$img = new Image("source.jpg");
$overlay = new Overlay($w, $h, $color);
$img->merge($overlay, 0, 0);
$img->save("result.jpg");`
    },
    {
        id: 7,
        title: 'Geometric Shapes',
        icon: 'Hexagon',
        desc: 'Create circles, triangles, and polygons',
        endpoint: `${API_BASE}/api/imageartist/shape.php`,
        code: `$circle = new CircularShape("source.jpg");
$circle->build();
$circle->save("circle.png", IMAGETYPE_PNG);`
    },
    {
        id: 8,
        title: 'Merge Images',
        icon: 'Layers',
        desc: 'Combine multiple photos into one',
        endpoint: `${API_BASE}/api/imageartist/merge.php`,
        code: `$base = new Image("base.jpg");
$layer = new Image("layer.png");
$base->merge($layer, 100, 100);
$base->save("merged.jpg");`
    }
];

export default function ImageArtistApp() {
    const [activeFeature, setActiveFeature] = useState(null);
    const [activeTab, setActiveTab] = useState('features');

    return (
        <div className="app-container">
            {/* ... Navbar ... */}
            <nav className="navbar">
                <div className="max-w-container nav-content">
                    <div className="logo">
                        <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>IA</div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>ImageArtist</span>
                    </div>
                    <a
                        href="https://github.com/treinetic/ImageArtist"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <Icons.Github size={24} />
                    </a>
                </div>
            </nav>

            <main className="max-w-container" style={{ paddingTop: '100px' }}>
                {/* ... Hero and Tabs ... */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="hero-title" style={{
                        background: 'linear-gradient(135deg, #fff 0%, #f43f5e 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem'
                    }}>
                        The Creative Studio
                    </h1>
                    <p className="hero-subtitle">
                        A powerful PHP image manipulation library. Resize, crop, merge, and transform images with an elegant, fluent API.
                    </p>

                    <div className="install-box">
                        <span className="cmd-prefix">$</span>
                        composer require treinetic/imageartist
                        <Icons.Copy
                            size={16}
                            style={{ cursor: 'pointer', marginLeft: 'auto' }}
                            onClick={() => navigator.clipboard.writeText('composer require treinetic/imageartist')}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    <div style={{ background: 'var(--bg-panel)', padding: '0.25rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', gap: '0.25rem' }}>
                        <button
                            onClick={() => setActiveTab('features')}
                            style={{
                                padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer',
                                background: activeTab === 'features' ? '#ec4899' : 'transparent',
                                color: activeTab === 'features' ? 'white' : 'var(--text-muted)'
                            }}
                        >
                            Core Features
                        </button>
                        <button
                            onClick={() => setActiveTab('game')}
                            style={{
                                padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer',
                                background: activeTab === 'game' ? '#f43f5e' : 'transparent',
                                color: activeTab === 'game' ? 'white' : 'var(--text-muted)'
                            }}
                        >
                            👨‍🎨 The Artist Game
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'features' ? (
                        <FeatureGrid key="grid" onTry={setActiveFeature} />
                    ) : (
                        <ArtistGame key="game" />
                    )}
                </AnimatePresence>
            </main>

            {activeFeature && (
                <DemoModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
            )}
        </div>
    );
}

function FeatureGrid({ onTry }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="features-grid"
        >
            {artistFeatures.map(f => (
                <div key={f.id} className="card" style={{ hover: { borderColor: '#ec4899' } }}>
                    <div className="card-icon" style={{ color: '#ec4899', borderColor: 'rgba(236,72,153,0.3)' }}>
                        <IconComponent name={f.icon} />
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>

                    <div className="code-block">
                        <pre>{f.code}</pre>
                    </div>

                    <button
                        onClick={() => onTry(f)}
                        className="demo-btn"
                        style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899', marginTop: 'auto' }}
                    >
                        <Icons.Play size={16} /> Try Live Demo
                    </button>
                </div>
            ))}
        </motion.div>
    );
}

function DemoModal({ feature, onClose }) {
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        if (feature.id === 8 && !file2) return;

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('image', file);
        if (feature.id === 8 && file2) {
            formData.append('image2', file2);
        }

        // Add dummy params for specific demos
        if (feature.id === 3) formData.append('angle', 90);
        if (feature.id === 5) formData.append('text', 'Treinetic');

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
                    <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
                        <IconComponent name={feature.icon} size={24} />
                        {feature.title} Demo
                    </div>
                    <button className="close-btn" onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <Icons.X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Primary Image Upload */}
                            <div className="upload-zone">
                                <input
                                    type="file"
                                    className="upload-input"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <div style={{ pointerEvents: 'none' }}>
                                    <Icons.UploadCloud size={48} color="#ec4899" style={{ marginBottom: '1rem' }} />
                                    <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        {file ? file.name : (feature.id === 8 ? 'Select Base Image' : 'Click or Drag Image Here')}
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Image Upload for Merge Feature */}
                            {feature.id === 8 && (
                                <div className="upload-zone" style={{ borderColor: 'var(--accent)', background: 'rgba(6, 182, 212, 0.05)' }}>
                                    <input
                                        type="file"
                                        className="upload-input"
                                        accept="image/*"
                                        onChange={(e) => setFile2(e.target.files[0])}
                                    />
                                    <div style={{ pointerEvents: 'none' }}>
                                        <Icons.Layers size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                                        <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--accent)' }}>
                                            {file2 ? file2.name : 'Select Overlay Image'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="action-btn"
                            disabled={!file || (feature.id === 8 && !file2) || loading}
                            style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <Icons.Loader2 className="animate-spin" /> Processing...
                                </span>
                            ) : 'Run Transformation'}
                        </button>
                    </form>

                    {/* Code Snippet Display */}
                    <div style={{ marginTop: '2rem' }}>
                        <div style={{
                            fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)',
                            uppercase: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem'
                        }}>
                            PHP Usage
                        </div>
                        <div className="code-block">
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                {feature.code}
                            </pre>
                        </div>
                    </div>

                    {error && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Icons.AlertCircle size={20} />
                            {error}
                        </div>
                    )}

                    {result && result.url && (
                        <div className="result-area">
                            <div className="success-msg">
                                <Icons.CheckCircle size={20} /> Success!
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <img src={result.url} alt="Result" style={{ maxHeight: '300px', maxWidth: '100%', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border)' }} />
                                <br />
                                <a href={result.url} target="_blank" rel="noreferrer" className="download-link" style={{ display: 'inline-flex', width: 'auto' }}>
                                    Download Image <Icons.Download size={16} style={{ marginLeft: '0.5rem' }} />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ArtistGame() {
    const [step, setStep] = useState(0);
    const [image, setImage] = useState(null); // Current image URL
    const [loading, setLoading] = useState(false);

    // Initial Upload
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('action', 'init');

        try {
            const res = await fetch(`${API_BASE}/api/imageartist/game.php`, { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) {
                setImage(data.url);
                setStep(1);
            }
        } catch (err) {
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    // Process Step
    const processStep = async (action) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('current_image', image);
        formData.append('action', action);

        try {
            const res = await fetch(`${API_BASE}/api/imageartist/game.php`, { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) {
                setImage(data.url);
                setStep(s => s + 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card"
            style={{ maxWidth: '800px', margin: '0 auto', padding: 0 }}
        >
            <div style={{
                padding: '2rem', borderBottom: '1px solid var(--border)',
                background: 'linear-gradient(90deg, rgba(236,72,153,0.1), rgba(244,63,94,0.1))'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Icons.Palette color="#ec4899" />
                        The Masterpiece Workshop
                    </h2>
                    <div style={{ fontFamily: 'var(--font-mono)', color: '#ec4899' }}>Step {step} / 4</div>
                </div>
                <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                        background: 'linear-gradient(90deg, #ec4899, #f43f5e)', height: '100%',
                        width: `${(step / 4) * 100}%`, transition: 'all 0.5s ease'
                    }} />
                </div>
            </div>

            <div style={{ padding: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {step === 0 && (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <div className="upload-zone" style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <input type="file" className="upload-input" accept="image/*" onChange={handleUpload} />

                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icons.UploadCloud size={32} color="var(--text-muted)" />
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Start Your Creation</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Upload a base image to begin.</p>

                            <div className="demo-btn" style={{ maxWidth: '200px', margin: '0 auto' }}>
                                {loading ? 'Uploading...' : 'Upload Image'}
                            </div>
                        </div>
                    </div>
                )}

                {step > 0 && (
                    <div style={{ display: 'flex', gap: '2rem', width: '100%', flexDirection: 'column' }}>
                        <div style={{ flex: 1, background: '#000', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden', height: '400px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {loading && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                                    <Icons.Loader2 size={32} className="animate-spin" color="#ec4899" />
                                    <span style={{ fontFamily: 'var(--font-mono)' }}>Applying Filter...</span>
                                </div>
                            )}
                            <img src={image} alt="Work in progress" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {step === 1 && (
                                <>
                                    <GameButton icon="Moon" title="Noir Classic" desc="Black & White" onClick={() => processStep('bw')} color="#ec4899" />
                                    <GameButton icon="Sun" title="Vintage Warmth" desc="Sepia Tone" onClick={() => processStep('sepia')} color="#f59e0b" />
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <GameButton icon="Square" title="Modern Square" desc="1:1 Ratio" onClick={() => processStep('square')} color="#ec4899" />
                                    <GameButton icon="Circle" title="Circular Crop" desc="Rounded" onClick={() => processStep('circle')} color="#3b82f6" />
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <GameButton icon="PenTool" title="Signature" desc="Bottom Right" onClick={() => processStep('sign_bottom')} color="#ec4899" />
                                    <GameButton icon="Shield" title="Watermark" desc="Center Protection" onClick={() => processStep('sign_center')} color="#10b981" />
                                </>
                            )}
                            {step === 4 && (
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>It's Ready!</h3>
                                    <a href={image} download="masterpiece.jpg" className="action-btn" style={{ display: 'inline-flex', width: 'auto', gap: '0.5rem', alignItems: 'center', padding: '1rem 3rem' }}>
                                        <Icons.Download size={20} /> Download Result
                                    </a>
                                    <button onClick={() => setStep(0)} style={{ display: 'block', margin: '1rem auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                        Start Over
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

const GameButton = ({ icon, title, desc, onClick, color }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left',
            background: 'var(--bg-panel)', border: '1px solid var(--border)',
            padding: '1rem', borderRadius: '12px', cursor: 'pointer', minWidth: '200px',
            transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = 'var(--bg-panel-hover)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-panel)'; }}
    >
        <div style={{
            width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: color
        }}>
            <IconComponent name={icon} size={20} />
        </div>
        <div>
            <div style={{ fontWeight: 700, color: 'white' }}>{title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{desc}</div>
        </div>
    </button>
);
