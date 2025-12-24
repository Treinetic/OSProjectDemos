import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Default import supported in v3.1.0
import VideoRecorder from 'videorecorderjs';

const IconComponent = ({ name, size = 24 }) => {
    const Icon = Icons[name] || Icons.Video;
    return <Icon size={size} />;
};

const features = [
    {
        id: 1,
        title: "Camera Recording",
        description: "Record high-quality video directly from the user's webcam.",
        icon: "Camera",
        code: `const recorder = new VideoRecorder({
    videoTagId: 'myVideo',
    videoWidth: 1280,
    videoHeight: 720
});

// Add effects (v3.1.0+)
recorder.setFilter('sepia(50%)');
recorder.setWatermark('My Video');

await recorder.startCamera();
recorder.startRecording();`,
        type: 'camera'
    },
    {
        id: 2,
        title: "Screen Recording",
        description: "Capture the entire screen, application window, or browser tab.",
        icon: "Monitor",
        code: `const recorder = new VideoRecorder({
    videoTagId: 'myVideo'
});

await recorder.startScreen();
recorder.startRecording();`,
        type: 'screen'
    },
];

export default function VideoRecorderApp() {
    const [activeFeature, setActiveFeature] = useState(null);

    return (
        <div className="app-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="max-w-container nav-content">
                    <div className="logo">
                        <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>VR</div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>VideoRecorderJS</span>
                    </div>
                    <a
                        href="https://github.com/imalhasaranga/VideoRecorderJs"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <Icons.Github size={24} />
                    </a>
                </div>
            </nav>

            <main className="max-w-container" style={{ paddingTop: '100px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="hero-title" style={{
                        background: 'linear-gradient(135deg, #fff 0%, #f59e0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem'
                    }}>
                        Capture the Moment
                    </h1>
                    <p className="hero-subtitle">
                        A modern, lightweight JavaScript library for recording video and screen content in the browser.
                    </p>

                    <div className="install-box">
                        <span className="cmd-prefix">$</span>
                        npm install videorecorderjs
                        <Icons.Copy
                            size={16}
                            style={{ cursor: 'pointer', marginLeft: 'auto' }}
                            onClick={() => navigator.clipboard.writeText('npm install videorecorderjs')}
                        />
                    </div>
                </div>

                <div className="features-grid">
                    {features.map(f => (
                        <div key={f.id} className="card" style={{ hover: { borderColor: '#f59e0b' } }}>
                            <div className="card-icon" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                                <IconComponent name={f.icon} />
                            </div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>

                            <div className="code-block">
                                <pre>{f.code}</pre>
                            </div>

                            <button
                                onClick={() => setActiveFeature(f)}
                                className="demo-btn"
                                style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', marginTop: 'auto' }}
                            >
                                <Icons.Play size={16} /> Try Live Demo
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {activeFeature && (
                <DemoModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
            )}
        </div>
    );
}

function DemoModal({ feature, onClose }) {
    const videoRef = useRef(null);
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedUrl, setRecordedUrl] = useState(null);
    const [timer, setTimer] = useState(0);

    // New controls for v3.1.0 features
    const [filter, setFilter] = useState('none');
    const [watermark, setWatermark] = useState('');

    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (recordedUrl) URL.revokeObjectURL(recordedUrl);
            clearInterval(timerRef.current);
            if (recorder) {
                // Attempt cleanup if possible, though library handles stream stop on its own stopRecording
            }
        };
    }, []);

    // Effect to update filter/watermark live if recorder exists
    useEffect(() => {
        if (recorder) {
            recorder.setFilter(filter);
        }
    }, [filter, recorder]);

    useEffect(() => {
        if (recorder) {
            recorder.setWatermark(watermark);
        }
    }, [watermark, recorder]);


    const startRecording = async () => {
        try {
            const isScreen = feature.type === 'screen';

            // v3.1.0 supports passing DOM element directly!
            // But let's stick to ID string for now to be safe, or try ref if we want to show off.
            // The library code says: `this.config.videoTagId instanceof HTMLVideoElement` check is there.
            // But let's use ID string 'vr-preview-video' to match the DOM element below.

            const rec = new VideoRecorder({
                videoTagId: 'vr-preview-video', // CamelCase supported in v3.1.0
                videoWidth: 1280,
                videoHeight: 720,
            });

            // Handle Stop Event
            rec.on('stop', (result) => {
                setIsRecording(false);
                clearInterval(timerRef.current);

                // v3.1.0 returns { blob, url, type, mimeType, extension }
                // We can use result.url directly or create our own.
                // NOTE: Library uses canvas stream, so result will be WebM usually.
                const url = window.URL.createObjectURL(result.blob);
                setRecordedUrl(url);

                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                    videoRef.current.src = url;
                    videoRef.current.controls = true;
                    // videoRef.current.play(); // Let user play
                }
            });

            // Handle Errors
            rec.on('stream-error', (e) => {
                console.error("Stream Error", e);
                alert("Stream Error: " + e.message);
            });

            // Initialize
            if (isScreen) {
                await rec.startScreen();
            } else {
                await rec.startCamera();
            }

            // Apply initial settings
            rec.setFilter(filter);
            rec.setWatermark(watermark);

            // Start Capture
            rec.startRecording();

            setRecorder(rec);
            setIsRecording(true);
            setRecordedUrl(null);

            setTimer(0);
            timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);

        } catch (err) {
            console.error(err);
            alert("Failed to start: " + err.message);
        }
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stopRecording();
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const filters = [
        { label: 'None', value: 'none' },
        { label: 'Gray', value: 'grayscale(100%)' },
        { label: 'Sepia', value: 'sepia(100%)' },
        { label: 'Blur', value: 'blur(4px)' },
        { label: 'Invert', value: 'invert(100%)' },
    ];

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content" style={{ maxWidth: '900px' }}>
                <div className="modal-header">
                    <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
                        <IconComponent name={feature.icon} size={24} />
                        {feature.title} Demo
                    </div>
                    <button className="close-btn" onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <Icons.X size={24} />
                    </button>
                </div>

                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {recordedUrl && (
                        <div style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                            <Icons.CheckCircle size={20} /> Recording Complete. You can play it back below.
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        {/* Video Area */}
                        <div style={{
                            flex: 2, minWidth: '300px',
                            aspectRatio: '16/9', background: '#000',
                            borderRadius: '12px', overflow: 'hidden', position: 'relative'
                        }}>
                            <video
                                id="vr-preview-video"
                                ref={videoRef}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                autoPlay
                                muted={isRecording}
                            />

                            {isRecording && (
                                <div style={{
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    background: 'rgba(220, 38, 38, 0.9)', color: 'white',
                                    padding: '0.25rem 0.75rem', borderRadius: '4px',
                                    fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                                    {formatTime(timer)}
                                </div>
                            )}
                        </div>

                        {/* Controls Sidebar */}
                        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Actions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIONS</label>
                                {!isRecording && !recordedUrl && (
                                    <button
                                        onClick={startRecording}
                                        className="action-btn"
                                        style={{ width: '100%', padding: '0.75rem', background: '#f59e0b', justifyContent: 'center' }}
                                    >
                                        Start Recording
                                    </button>
                                )}

                                {isRecording && (
                                    <button
                                        onClick={stopRecording}
                                        className="action-btn"
                                        style={{ width: '100%', padding: '0.75rem', background: '#ef4444', justifyContent: 'center' }}
                                    >
                                        Stop Recording
                                    </button>
                                )}

                                {recordedUrl && (
                                    <button
                                        onClick={() => {
                                            setRecordedUrl(null);
                                            if (videoRef.current) {
                                                videoRef.current.src = "";
                                                videoRef.current.controls = false;
                                            }
                                        }}
                                        className="action-btn"
                                        style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-panel-hover)', color: 'var(--text-main)', justifyContent: 'center' }}
                                    >
                                        New Recording
                                    </button>
                                )}
                            </div>

                            {/* Filters */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>FILTERS</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    {filters.map(f => (
                                        <button
                                            key={f.value}
                                            onClick={() => setFilter(f.value)}
                                            style={{
                                                padding: '0.5rem',
                                                border: filter === f.value ? '1px solid #f59e0b' : '1px solid var(--border)',
                                                background: filter === f.value ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                                                color: filter === f.value ? '#f59e0b' : 'var(--text-main)',
                                                borderRadius: '6px',
                                                cursor: isRecording ? 'pointer' : 'not-allowed', // Filters verify live during recording in v3.1.0 normally, but we can allow pre-set
                                                opacity: isRecording ? 1 : 0.5,
                                                fontSize: '0.9rem'
                                            }}
                                            disabled={!isRecording}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>* Filters apply only during recording</div>
                            </div>

                            {/* Watermark */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>WATERMARK</label>
                                <input
                                    type="text"
                                    placeholder="Enter text..."
                                    value={watermark}
                                    onChange={(e) => setWatermark(e.target.value)}
                                    disabled={!isRecording}
                                    style={{
                                        width: '100%', padding: '0.5rem', borderRadius: '6px',
                                        background: 'var(--bg-dark)', border: '1px solid var(--border)',
                                        color: 'var(--text-main)', opacity: isRecording ? 1 : 0.5
                                    }}
                                />
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
