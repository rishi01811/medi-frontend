import { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import './styles/App.css'

const API_URL = "https://rishi01811-phytoscan-backend.hf.space"

// ─── Particle Background ─────────────────────────────────────────────────────
function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            '--delay': `${Math.random() * 8}s`,
            '--duration': `${6 + Math.random() * 8}s`,
            '--x': `${Math.random() * 100}%`,
            '--size': `${1 + Math.random() * 3}px`,
            '--opacity': 0.2 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="header-inner">
        <div className="logo-group">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="url(#g1)" strokeWidth="1.5" />
              <path d="M14 6 C8 6 6 12 8 16 C10 20 14 22 14 22" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 6 C20 6 22 12 20 16 C18 20 14 22 14 22" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="14" r="2.5" fill="url(#g1)" />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#00e5c3" />
                  <stop offset="100%" stopColor="#0af0ff" />
                </linearGradient>
                <linearGradient id="g2" x1="28" y1="0" x2="0" y2="28">
                  <stop offset="0%" stopColor="#39ff8a" />
                  <stop offset="100%" stopColor="#00e5c3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="logo-name">PhytoScan <span className="logo-ai">AI</span></h1>
            <p className="logo-tagline">Medicinal Plant Intelligence</p>
          </div>
        </div>

        <nav className="header-nav">
          <span className="nav-badge">
            <span className="status-dot" />
            Model Active
          </span>
          <span className="nav-label mono">MobileNetV2 v2.0</span>
        </nav>
      </div>
    </motion.header>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
      >
        <span className="badge-dot" />
        Deep Learning · Transfer Learning · MobileNetV2
      </motion.div>

      <motion.h2
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Identify Medicinal Plants
        <br />
        <span className="glow-text">With AI Precision</span>
      </motion.h2>

      <motion.p
        className="hero-desc"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Upload any plant image and get instant identification with detailed medicinal properties,
        scientific classification, and traditional uses — powered by deep convolutional neural networks.
      </motion.p>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {[
          { value: '40+', label: 'Plant Species' },
          { value: '6500+', label: 'Training Images' },
          { value: '95%+', label: 'Accuracy' },
          { value: '<200ms', label: 'Inference' },
        ].map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value glow-text">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────
function UploadZone({ onImageSelect, isLoading }) {
  const [preview, setPreview] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    onImageSelect(file)
  }, [onImageSelect])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.bmp'] },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  return (
    <motion.div
      className="upload-section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'drag-active' : ''} ${preview ? 'has-preview' : ''} ${isLoading ? 'scan-overlay' : ''}`}
      >
        <input {...getInputProps()} />

        {/* Corner decorations */}
        <span className="corner tl" /><span className="corner tr" />
        <span className="corner bl" /><span className="corner br" />

        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Plant preview" className="preview-img" />
            {isLoading && (
              <div className="scan-overlay-inner">
                <div className="scan-bar" />
                <p className="scanning-text mono">ANALYZING SPECIMEN...</p>
              </div>
            )}
            {!isLoading && (
              <div className="preview-overlay">
                <p>Drop new image to re-analyze</p>
              </div>
            )}
          </div>
        ) : (
          <div className="dropzone-content">
            <motion.div
              className="upload-icon-wrap"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="24" stroke="url(#ug)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="26" cy="26" r="16" stroke="url(#ug)" strokeWidth="1.5" />
                <path d="M26 33 L26 19 M19 26 L26 19 L33 26" stroke="url(#ug)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="ug" x1="0" y1="0" x2="52" y2="52">
                    <stop offset="0%" stopColor="#00e5c3" />
                    <stop offset="100%" stopColor="#39ff8a" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <h3 className="dropzone-title">Drop Plant Image Here</h3>
            <p className="dropzone-sub">or <span className="link-accent">click to browse</span> your files</p>
            <p className="dropzone-formats mono">JPG · PNG · WEBP · BMP</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <motion.div
      className="loading-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="ai-loader">
        <div className="loader-rings">
          <div className="ring r1" />
          <div className="ring r2" />
          <div className="ring r3" />
          <div className="loader-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z" fill="url(#lg)" />
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="20" y2="20">
                  <stop offset="0%" stopColor="#00e5c3" />
                  <stop offset="100%" stopColor="#39ff8a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="loading-steps">
          {['Preprocessing image...', 'Running neural network...', 'Analyzing features...', 'Generating results...'].map((step, i) => (
            <motion.p
              key={step}
              className="loading-step mono"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: i * 0.6, duration: 1.5, repeat: Infinity, repeatDelay: 1.8 }}
            >
              <span className="step-dot" />
              {step}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Confidence Bar ───────────────────────────────────────────────────────────
function ConfidenceBar({ value, color = 'var(--accent-primary)', label, delay = 0 }) {
  return (
    <div className="confidence-bar-wrap">
      <div className="bar-header">
        <span className="bar-label">{label}</span>
        <span className="bar-value mono">{value.toFixed(1)}%</span>
      </div>
      <div className="bar-track">
        <motion.div
          className="bar-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

// ─── Result Card ──────────────────────────────────────────────────────────────
function ResultCard({ result }) {
  const { prediction, plant_info, top_3_predictions, inference_time_ms, image_info } = result

  const confidenceColor = prediction.confidence > 85
    ? '#39ff8a'
    : prediction.confidence > 60
    ? '#00e5c3'
    : '#ff6b35'

  return (
    <motion.div
      className="result-card"
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* ── Header ── */}
      <div className="result-header">
        <div className="result-title-group">
          <motion.span
            className="result-tag mono"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            IDENTIFIED SPECIMEN
          </motion.span>
          <motion.h3
            className="result-plant-name"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {prediction.plant_name}
          </motion.h3>
          <motion.p
            className="result-scientific"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <em>{plant_info.scientific_name}</em> · {plant_info.family}
          </motion.p>
        </div>

        <motion.div
          className="confidence-circle"
          style={{ '--c': confidenceColor }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 180 }}
        >
          <svg className="circle-svg" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" className="circle-track" />
            <motion.circle
              cx="40" cy="40" r="34"
              className="circle-fill"
              stroke={confidenceColor}
              strokeDasharray={`${2 * Math.PI * 34}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - prediction.confidence / 100) }}
              transition={{ delay: 0.5, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>
          <div className="circle-text">
            <span className="circle-value">{prediction.confidence.toFixed(0)}%</span>
            <span className="circle-label">conf.</span>
          </div>
        </motion.div>
      </div>

      {/* ── Inference Stats ── */}
      <motion.div
        className="inference-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { label: 'INFERENCE', value: `${inference_time_ms}ms` },
          { label: 'IMAGE', value: image_info.dimensions },
          { label: 'FILE', value: `${image_info.size_kb}KB` },
          { label: 'HABITAT', value: plant_info.habitat.split(',')[0] },
        ].map((stat, i) => (
          <div key={stat.label} className="i-stat">
            <span className="i-stat-label mono">{stat.label}</span>
            <span className="i-stat-value">{stat.value}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Top 3 Predictions ── */}
      <motion.div
        className="predictions-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <h4 className="section-label">TOP PREDICTIONS</h4>
        {top_3_predictions.map((pred, i) => (
          <ConfidenceBar
            key={pred.plant_name}
            label={pred.plant_name}
            value={pred.confidence}
            delay={0.6 + i * 0.1}
            color={i === 0 ? 'linear-gradient(90deg, #00e5c3, #39ff8a)' : i === 1 ? 'rgba(0,229,195,0.6)' : 'rgba(0,229,195,0.35)'}
          />
        ))}
      </motion.div>

      {/* ── Description ── */}
      <motion.div
        className="plant-description"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h4 className="section-label">ABOUT THIS PLANT</h4>
        <p className="desc-text">{plant_info.description}</p>
        <div className="plant-meta">
          <span className="meta-item">
            <span className="meta-label">Parts Used</span>
            <span className="meta-value">{plant_info.parts_used}</span>
          </span>
        </div>
      </motion.div>

      {/* ── Medicinal Uses ── */}
      <motion.div
        className="medicinal-uses"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="section-label">MEDICINAL USES</h4>
        <div className="uses-grid">
          {plant_info.medicinal_uses.map((use, i) => (
            <motion.div
              key={i}
              className="use-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
            >
              <span className="use-icon">✦</span>
              <span className="use-text">{use}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Disclaimer ── */}
      <motion.p
        className="disclaimer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        ⚠️ For educational purposes only. Consult a qualified practitioner before use.
      </motion.p>
    </motion.div>
  )
}

// ─── Rejection Card (not a plant image) ──────────────────────────────────────
function RejectionCard({ data, onRetry }) {
  const { rejection_reason, rejection_detail, confidence, entropy_ratio } = data
  return (
    <motion.div
      className="rejection-card"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1,   y: 0  }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 180 }}
    >
      <motion.div
        className="rejection-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" stroke="#ff6b35" strokeWidth="1.5" />
          <path d="M14 14 L30 30 M30 14 L14 30" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.h3
        className="rejection-title"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Not a Medicinal Plant
      </motion.h3>

      <motion.p
        className="rejection-reason"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {rejection_reason}
      </motion.p>

      <motion.div
        className="rejection-stats"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="rej-stat">
          <span className="rej-stat-label mono">CONFIDENCE</span>
          <span className="rej-stat-value" style={{ color: '#ff6b35' }}>
            {confidence?.toFixed(1)}%
          </span>
        </div>
        <div className="rej-stat">
          <span className="rej-stat-label mono">ENTROPY</span>
          <span className="rej-stat-value" style={{ color: '#ff6b35' }}>
            {entropy_ratio?.toFixed(3)}
          </span>
        </div>
        <div className="rej-stat">
          <span className="rej-stat-label mono">VERDICT</span>
          <span className="rej-stat-value" style={{ color: '#ff6b35' }}>Rejected</span>
        </div>
      </motion.div>

      {rejection_detail && (
        <motion.p
          className="rejection-detail mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {rejection_detail}
        </motion.p>
      )}

      <motion.div
        className="rejection-tips"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="tips-title">For best results, upload:</p>
        <ul className="tips-list">
          <li>A clear photo of a single plant or leaf</li>
          <li>Good lighting with the plant in focus</li>
          <li>One of the 40+ supported medicinal plant species</li>
        </ul>
      </motion.div>

      <motion.button
        className="retry-btn"
        onClick={onRetry}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Try Another Image
      </motion.button>
    </motion.div>
  )
}

// ─── Error Card (API/network errors) ─────────────────────────────────────────
function ErrorCard({ message, onRetry }) {
  return (
    <motion.div
      className="error-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="error-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#ff3d6e" strokeWidth="1.5" />
          <path d="M16 9 L16 18" stroke="#ff3d6e" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="23" r="1.5" fill="#ff3d6e" />
        </svg>
      </div>
      <h3 className="error-title">Analysis Failed</h3>
      <p className="error-message">{message}</p>
      <button className="retry-btn" onClick={onRetry}>Try Again</button>
    </motion.div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoading,  setIsLoading]  = useState(false)
  const [result,     setResult]     = useState(null)      // plant result
  const [rejection,  setRejection]  = useState(null)      // rejected (not a plant)
  const [error,      setError]      = useState(null)      // network/API error
  const resultRef = useRef(null)

  const handleImageSelect = useCallback(async (file) => {
    setIsLoading(true)
    setResult(null)
    setRejection(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      })

      const data = response.data

      // Route response: plant vs rejected vs error
      if (data.is_plant === false) {
        setRejection(data)
      } else {
        setResult(data)
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)

    } catch (err) {
      const msg = err.response?.data?.detail
        || (err.code === 'ECONNREFUSED'
          ? 'Cannot connect to the API server. Make sure the backend is running on port 8000.'
          : null)
        || err.message
        || 'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleReset = () => {
    setResult(null)
    setRejection(null)
    setError(null)
  }

  return (
    <div className="app">
      <ParticleField />
      <Header />

      <main className="main-content">
        <Hero />

        <div className="upload-result-grid">
          <UploadZone onImageSelect={handleImageSelect} isLoading={isLoading} />

          <div ref={resultRef} className="result-area">
            <AnimatePresence mode="wait">
              {isLoading && <LoadingState key="loading" />}

              {error && !isLoading && (
                <ErrorCard key="error" message={error} onRetry={handleReset} />
              )}

              {/* ── NOT A PLANT — show rejection card ── */}
              {rejection && !isLoading && (
                <RejectionCard key="rejection" data={rejection} onRetry={handleReset} />
              )}

              {/* ── IS A PLANT — show full result ── */}
              {result && !isLoading && (
                <ResultCard key="result" result={result} />
              )}

              {!isLoading && !result && !rejection && !error && (
                <motion.div
                  key="empty"
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="empty-deco">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="deco-ring" style={{ '--i': i }} />
                    ))}
                    <div className="empty-icon">🌿</div>
                  </div>
                  <p className="empty-title">Upload a plant image to begin</p>
                  <p className="empty-sub">Our AI will identify the plant and reveal its medicinal properties</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text mono">
          PhytoScan AI · MobileNetV2 · TensorFlow · Built with ❤️ for medicinal plant research
        </p>
      </footer>
    </div>
  )
}
