import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Import the library (Named Imports as per v2.0.3 Guide)
import { create, open, setTheme, setFontSize, setScrollOption, nextPage, prevPage } from '@treinetic/treinetic-epub-reader';

// We need to import the library's CSS
import '@treinetic/treinetic-epub-reader/dist/style.css';

const themes = [
    { id: 'day', name: 'Day', bg: '#ffffff', color: '#1a1a1a', icon: 'Sun' },
    { id: 'sepia', name: 'Sepia', bg: '#f6efdf', color: '#5f4b32', icon: 'BookOpen' },
    { id: 'night', name: 'Night', bg: '#1a1a1a', color: '#e5e5e5', icon: 'Moon' },
];

// ... imports

export default function EpubReaderApp() {
    return (
        <div className="app-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="max-w-container nav-content">
                    <div className="logo">
                        <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>TR</div>
                        <span>Treinetic Reader</span>
                    </div>
                    <a
                        href="https://github.com/Treinetic/TreineticEpubReader"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <Icons.Github size={24} />
                    </a>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="hero">
                    <div className="max-w-container">
                        <h1 className="hero-title">
                            Modern EPUB Reader
                        </h1>
                        <p className="hero-subtitle">
                            A powerful, lightweight, and customizable EPUB reader for your web applications.
                        </p>

                        <div className="install-box">
                            <span className="cmd-prefix">$</span>
                            npm install @treinetic/treinetic-epub-reader
                            <Icons.Copy
                                size={16}
                                style={{ cursor: 'pointer', marginLeft: 'auto' }}
                                onClick={() => navigator.clipboard.writeText('npm install @treinetic/treinetic-epub-reader')}
                            />
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-container" style={{ paddingBottom: '4rem' }}>
                    {/* Demo Container */}
                    <div className="demo-wrapper" style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        height: '650px',
                        background: 'var(--bg-panel)',
                        borderRadius: '16px',
                        border: '1px solid var(--border)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div className="window-bar" style={{
                            padding: '0.75rem 1rem',
                            background: 'var(--bg-panel)',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                            <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Live Demo</div>
                        </div>

                        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                            <ReaderDemo />
                        </div>
                    </div>

                    {/* Features Highlights */}
                    <div className="features-grid" style={{ marginTop: '4rem' }}>
                        <FeatureCard icon="Zap" title="Lightweight" desc="Zero heavy dependencies, optimized for performance." />
                        <FeatureCard icon="Layout" title="Responsive" desc="Adapts perfectly to mobile, tablet, and desktop screens." />
                        <FeatureCard icon="Palette" title="Themable" desc="Built-in Day, Night, and Sepia modes with custom CSS support." />
                    </div>
                </section>
            </main>

            <style>{`
                /* Reader Specific Theme Overrides */
                .epubreader-card {
                    --primary: #10b981;
                    --primary-glow: rgba(16, 185, 129, 0.4);
                }

                /* Reader Internal Styles */
                /* Ensure Sidebar Text is visible on white background */
                .sidebar-section { padding: 2rem; }
                .sidebar-section h3 { 
                    font-size: 0.75rem; 
                    font-weight: 800; 
                    color: #94a3b8; /* Slate-400 */
                    margin-bottom: 1.5rem; 
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }
                
                .theme-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
                .theme-btn {
                    display: flex; flex-direction: column; alignItems: center; gap: 0.75rem;
                    padding: 1rem 0.5rem; 
                    border-radius: 16px; 
                    cursor: pointer;
                    border: 1px solid #e2e8f0; /* Light border */
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    background: #f8fafc; /* Slate-50 */
                }
                .theme-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-color: #10b981; }
                .theme-btn.active { 
                    border-color: #10b981; 
                    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4);
                    background: #fff;
                }
                .theme-btn span { font-size: 0.8rem; font-weight: 600; color: #334155; }

                .control-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .label { font-size: 0.95rem; font-weight: 600; color: #334155; /* Slate-700 */ }
                
                .counter { 
                    display: flex; align-items: center; gap: 0.5rem; 
                    background: #f1f5f9; /* Slate-100 */
                    padding: 0.35rem; 
                    border-radius: 14px; 
                    border: 1px solid #e2e8f0; 
                }
                .counter button { 
                    width: 32px; height: 32px; 
                    border-radius: 10px; 
                    display: flex; align-items: center; justify-content: center; 
                    cursor: pointer; 
                    color: #334155;
                    border: none;
                    background: #fff;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
                    transition: all 0.2s;
                }
                .counter button:hover { color: #10b981; }
                .counter button:active { transform: scale(0.95); }
                .counter span { font-size: 0.9rem; min-width: 3.5rem; text-align: center; font-weight: 700; font-variant-numeric: tabular-nums; color: #0f172a; }

                .toggle-group { 
                    display: flex; 
                    background: #f1f5f9; 
                    padding: 5px; 
                    border-radius: 14px; 
                    border: 1px solid #e2e8f0;
                }
                .toggle-group button { 
                    padding: 0.6rem 1.2rem; 
                    font-size: 0.85rem; 
                    font-weight: 600; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    color: #64748b; 
                    border: none;
                    background: transparent;
                    transition: all 0.2s;
                }
                .toggle-group button:hover { color: #10b981; }
                .toggle-group button.active { 
                    background: #fff; 
                    color: #10b981; /* Green active text */
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1); 
                }

                .divider-h { height: 1px; background: #e2e8f0; margin: 0 2rem; }

                .nav-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 1rem; }
                .nav-btn { 
                    display: flex; align-items: center; justify-content: center; gap: 0.6rem; 
                    padding: 0.9rem; 
                    border-radius: 14px; 
                    border: 1px solid #e2e8f0; 
                    background: #fff; 
                    font-size: 0.95rem; 
                    font-weight: 600; 
                    color: #334155;
                    cursor: pointer; 
                    transition: all 0.2s;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
                }
                .nav-btn:hover { 
                    border-color: #10b981; 
                    color: #10b981; 
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.4);
                }
                .nav-btn:active { transform: translateY(0); }

                .icon-btn { 
                    width: 42px; height: 42px;
                    border-radius: 12px; 
                    cursor: pointer; 
                    color: #64748b; 
                    display: flex; align-items: center; justify-content: center; 
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .icon-btn:hover { background: #f1f5f9; color: #0f172a; }
                .icon-btn.active { 
                    background: rgba(16, 185, 129, 0.15); /* Green Glow */
                    color: #10b981; /* Emerald Green */
                    border-color: rgba(16, 185, 129, 0.2);
                }
            `}</style>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    const Icon = Icons[icon];
    return (
        <div className="card epubreader-card">
            <div className="card-icon">
                <Icon size={24} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    )
}

function ReaderDemo() {
    const readerRef = useRef(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeTheme, setActiveTheme] = useState('day');
    const [fontSize, setFontSizeState] = useState(100);
    const [isScrollMode, setIsScrollMode] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const isInitialized = useRef(false);

    useEffect(() => {
        // Implementation Guide: TreineticEpubReader v2.0.3 with cleanup guard
        const init = async () => {
            if (isInitialized.current) return;

            try {
                // Prevent double injection
                isInitialized.current = true;

                // 1. Initialize (Named Import)
                create('#epub-reader-frame');

                // 2. Open Book (Named Import)
                const epubPath = '/moby-dick.epub';
                console.log("Opening EPUB:", epubPath);

                open(epubPath);
                setIsReady(true);
            } catch (e) {
                console.error("Error initializing reader:", e);
                isInitialized.current = false;
            }
        };

        setTimeout(init, 100);

        return () => {
            // Cleanup 
        };
    }, []);

    // Handlers
    const handleThemeChange = (id) => {
        setActiveTheme(id);
        if (typeof setTheme === 'function') setTheme(id);
    };

    const handleFontSize = (delta) => {
        const newSize = Math.max(50, Math.min(200, fontSize + delta));
        setFontSizeState(newSize);
        if (typeof setFontSize === 'function') setFontSize(newSize);
    };

    const handleLayoutChange = (mode) => {
        // mode: 'scroll' or 'auto' (paginated)
        setIsScrollMode(mode === 'scroll');
        if (typeof setScrollOption === 'function') {
            setScrollOption(mode);
        }
    };

    const handleNext = () => {
        if (typeof nextPage === 'function') nextPage();
    };

    const handlePrev = () => {
        if (typeof prevPage === 'function') prevPage();
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Embedded Toolbar/Navbar */}
            <nav style={{
                position: 'relative',
                borderBottom: '1px solid #e2e8f0',
                padding: '0 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '60px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                zIndex: 20
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '32px', height: '32px',
                        borderRadius: '8px',
                        background: '#10b981',
                        color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Icons.BookOpen size={18} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>Moby Dick</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>Herman Melville</div>
                    </div>
                </div>

                <div className="nav-actions">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className={`icon-btn ${isSidebarOpen ? 'active' : ''}`}
                        title="Toggle Sidebar"
                    >
                        <Icons.Sidebar size={20} />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', position: 'relative', background: 'var(--bg-dark)' }}>

                {/* Sidebar */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 320, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            style={{
                                background: '#fff',
                                borderRight: '1px solid var(--border)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                zIndex: 10
                            }}
                        >
                            {/* Section: Appearance */}
                            <div className="sidebar-section">
                                <h3>APPEARANCE</h3>

                                {/* Themes */}
                                <div className="theme-grid">
                                    {themes.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => handleThemeChange(t.id)}
                                            className={`theme-btn ${activeTheme === t.id ? 'active' : ''}`}
                                        >
                                            <div style={{ width: '100%', height: '30px', background: t.bg, borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                                            <span>{t.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Font Size */}
                                <div className="control-row">
                                    <span className="label">Text Size</span>
                                    <div className="counter">
                                        <button onClick={() => handleFontSize(-10)}><Icons.Minus size={14} /></button>
                                        <span>{fontSize}%</span>
                                        <button onClick={() => handleFontSize(10)}><Icons.Plus size={14} /></button>
                                    </div>
                                </div>
                            </div>

                            <div className="divider-h" />

                            {/* Section: Layout */}
                            <div className="sidebar-section">
                                <h3>LAYOUT & NAV</h3>

                                <div className="control-row">
                                    <span className="label">Mode</span>
                                    <div className="toggle-group">
                                        <button
                                            className={!isScrollMode ? 'active' : ''}
                                            onClick={() => handleLayoutChange('auto')}
                                        >Page</button>
                                        <button
                                            className={isScrollMode ? 'active' : ''}
                                            onClick={() => handleLayoutChange('scroll')}
                                        >Scroll</button>
                                    </div>
                                </div>

                                <div className="nav-controls">
                                    <button onClick={handlePrev} className="nav-btn">
                                        <Icons.ChevronLeft size={16} /> Prev
                                    </button>
                                    <button onClick={handleNext} className="nav-btn">
                                        Next <Icons.ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Reader Area */}
                <main
                    style={{ flex: 1, position: 'relative', height: '100%', overflow: 'hidden' }}
                    onMouseEnter={() => {
                        // Lock body scroll when mouse enters reader
                        document.body.style.overflow = 'hidden';
                    }}
                    onMouseLeave={() => {
                        // Restore body scroll when mouse leaves
                        document.body.style.overflow = 'auto';
                    }}
                >
                    <div
                        id="epub-reader-frame"
                        style={{
                            width: '100%',
                            height: '100%',
                            background: activeTheme === 'sepia' ? '#f6efdf' : activeTheme === 'night' ? '#1a1a1a' : '#ffffff'
                        }}
                    >
                        {/* Library injects iframe here */}
                    </div>
                </main>
            </div>
        </div>
    );
}

