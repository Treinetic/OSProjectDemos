import React from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import PDFLibApp from './lib/pdflib/App';
import ImageArtistApp from './lib/imageartist/App';
import VideoRecorderApp from './lib/videorecorder/App';
import EpubReaderApp from './lib/epubreader/App';

// Import CSS
import './index.css';

export default function RootApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pdflib" element={<PDFLibWrapper />} />
        <Route path="/imageartist" element={<ImageArtistWrapper />} />
        <Route path="/videorecorder" element={<VideoRecorderWrapper />} />
        <Route path="/epubreader" element={<EpubReaderWrapper />} />
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

const VideoRecorderWrapper = () => (
  <div>
    <BackToHome />
    <VideoRecorderApp />
  </div>
);

const EpubReaderWrapper = () => (
  <div>
    <BackToHome />
    <EpubReaderApp />
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

const FeatureCard = ({ title, description, icon, color, path, className, buttonText }) => {
  const IconComponent = Icons[icon];
  return (
    <Link
      to={path}
      className={`card ${className}`}
      style={{ textDecoration: 'none', height: '320px', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}
    >
      <div className="card-icon" style={{ width: '64px', height: '64px', fontSize: '2rem', color: color, borderColor: `${color}33` }}>
        {IconComponent && <IconComponent />}
      </div>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h2>
      <p>{description}</p>

      <div className="demo-btn" style={{ marginTop: 'auto', width: 'auto', padding: '0.5rem 1.5rem', background: `${color}1A`, color: color }}>
        {buttonText} <Icons.ArrowRight size={16} />
      </div>
    </Link>
  );
};

const LandingPage = () => {
  return (
    <div className="app-container" style={{ background: 'var(--bg-dark)' }}>
      {/* Hero Section - Full Height */}
      <div style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <div className="hero" style={{ position: 'absolute', width: '100%', height: '100%', padding: 0, zIndex: 0 }}></div>

        <div className="max-w-container" style={{ zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title" style={{ fontSize: '6rem', marginBottom: '2rem', lineHeight: '1.1' }}>
              Treinetic <br />
              <span style={{ color: 'var(--primary)' }}>Open Source Projects</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
              A showcase of powerful libraries built for modern developers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section - Below Fold */}
      <div className="max-w-container" style={{ position: 'relative', zIndex: 10, padding: '4rem 2rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', paddingBottom: 0 }}>

            <FeatureCard
              title="PDFLib"
              description="Fluent PDF manipulation. Merge, split, encrypt, and convert."
              icon="FileText"
              color="#3b82f6" // Blue
              path="/pdflib"
              buttonText="Explore Demo"
              className="pdflib-card"
            />

            <FeatureCard
              title="ImageArtist"
              description="The ultimate image toolkit. Resize, crop, filter, and create."
              icon="Image"
              color="#ec4899" // Pink
              path="/imageartist"
              buttonText="Enter Studio"
              className="imageartist-card"
            />

            <FeatureCard
              title="VideoRecorder"
              description="Modern HTML5 Video & Screen Recording Library."
              icon="Video"
              color="#f59e0b" // Amber
              path="/videorecorder"
              buttonText="Start Recording"
              className="videorecorder-card"
            />

            <FeatureCard
              title="EpubReader"
              description="Lightweight framework-agnostic EPUB3 reader."
              icon="BookOpen"
              color="#10b981" // Emerald
              path="/epubreader"
              buttonText="Open Reader"
              className="epubreader-card"
            />

          </div>
        </div>
      </div>
    </div>
  );
}
