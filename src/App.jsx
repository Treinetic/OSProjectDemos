import React from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import PDFLibApp from './lib/pdflib/App';
import ImageArtistApp from './lib/imageartist/App';

// Import CSS
import './index.css';

export default function RootApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pdflib" element={<PDFLibWrapper />} />
        <Route path="/imageartist" element={<ImageArtistWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

const PDFLibWrapper = () => (
  <div>
    <BackToHome />
    <PDFLibApp />
  </div>
);

const ImageArtistWrapper = () => (
  <div>
    <BackToHome />
    <ImageArtistApp />
  </div>
);

const BackToHome = () => (
  <div style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 9999 }}>
    <Link
      to="/"
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem 1rem', background: 'rgba(5,5,7,0.8)',
        color: 'white', border: '1px solid var(--border)',
        borderRadius: '99px', backdropFilter: 'blur(10px)',
        cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
        textDecoration: 'none'
      }}
    >
      <Icons.ArrowLeft size={16} /> Back to Demos
    </Link>
  </div>
);

function LandingPage() {
  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', background: 'var(--bg-dark)' }}>
      {/* Background Effects */}
      <div className="hero" style={{ position: 'absolute', width: '100%', height: '100%', padding: 0, zIndex: 0 }}></div>

      <div className="max-w-container" style={{ zIndex: 10, textAlign: 'center' }}>
        <div style={{ marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              Treinetic <br />
              <span style={{ color: 'var(--primary)' }}>Open Source Projects</span>
            </h1>
            <p className="hero-subtitle">
              A showcase of powerful libraries built for modern developers.
            </p>
          </motion.div>
        </div>

        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', paddingBottom: 0 }}>
          {/* PDFLib Card */}
          <Link
            to="/pdflib"
            className="card"
            style={{ textDecoration: 'none', height: '320px', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}
          >
            <div className="card-icon" style={{ width: '64px', height: '64px', fontSize: '2rem' }}>
              <Icons.FileText />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>PDFLib</h2>
            <p>Fluent PDF manipulation. Merge, split, encrypt, and convert.</p>

            <div className="demo-btn" style={{ marginTop: 'auto', width: 'auto', padding: '0.5rem 1.5rem' }}>
              Explore Demo <Icons.ArrowRight size={16} />
            </div>
          </Link>

          {/* ImageArtist Card */}
          <Link
            to="/imageartist"
            className="card imageartist-card"
            style={{ textDecoration: 'none', height: '320px', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}
          >
            <div className="card-icon" style={{ width: '64px', height: '64px', fontSize: '2rem', color: '#ec4899', borderColor: 'rgba(236, 72, 153, 0.2)' }}>
              <Icons.Image />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>ImageArtist</h2>
            <p>The ultimate image toolkit. Resize, crop, filter, and create.</p>

            <div className="demo-btn" style={{ marginTop: 'auto', width: 'auto', padding: '0.5rem 1.5rem', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
              Enter Studio <Icons.ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
