# 🌿 Medi — Medicinal Plant Intelligence

A deep learning–powered web app that identifies medicinal plants from images and returns detailed information about their scientific classification, medicinal uses, habitat, and traditional properties — all in under 200ms.

---

## ✨ Features

- **AI-Powered Identification** — MobileNetV2 transfer learning model trained on 6,500+ images across 40+ medicinal plant species
- **High Accuracy** — 95%+ identification accuracy with top-3 confidence predictions
- **Fast Inference** — Sub-200ms response times via a hosted HuggingFace Space backend
- **Smart Rejection** — Entropy-based filtering rejects non-plant or out-of-distribution images instead of forcing a wrong prediction
- **Rich Plant Info** — Returns scientific name, description, medicinal uses, habitat, parts used, and more
- **Animated UI** — Smooth botanical-themed interface built with Framer Motion
- **Drag & Drop Upload** — React Dropzone with live image preview and scanning overlay

---

## 🖥️ Tech Stack

**Frontend**
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/) — animations & transitions
- [React Dropzone](https://react-dropzone.js.org/) — file upload
- [Axios](https://axios-http.com/) — API requests
- Custom botanical CSS design system (Playfair Display · Instrument Sans · Caveat)

**Backend** *(separate repo)*
- TensorFlow / Keras — MobileNetV2 model
- FastAPI — REST inference endpoint
- Hosted on [HuggingFace Spaces](https://huggingface.co/spaces)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rishi01811/medi-frontend
cd medi-plant-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

Output is written to `dist/` and can be served with any static host.

---

## 🌐 Deployment

This project is configured for [Vercel](https://vercel.com/) out of the box.

```json
// vercel.json
{
  "buildCommand": "npx vite build",
  "outputDirectory": "dist"
}
```

Just connect your GitHub repo to Vercel and deploy — no extra configuration needed.

---

## 🔌 API

The frontend communicates with a FastAPI backend hosted on HuggingFace Spaces.

**Endpoint:** `POST /predict`

**Request:** `multipart/form-data` with a single `file` field (JPEG, PNG, WEBP, or BMP).

**Success Response:**
```json
{
  "is_plant": true,
  "prediction": {
    "plant_name": "Tulsi",
    "confidence": 97.4
  },
  "plant_info": {
    "scientific_name": "Ocimum tenuiflorum",
    "description": "...",
    "medicinal_uses": ["..."],
    "parts_used": "Leaves, seeds",
    "habitat": "Tropical Asia, India"
  },
  "top_3_predictions": [...],
  "inference_time_ms": 143,
  "image_info": {
    "dimensions": "640x480",
    "size_kb": 128
  }
}
```

**Rejection Response** (non-plant or out-of-distribution image):
```json
{
  "is_plant": false,
  "rejection_reason": "Image does not appear to contain a medicinal plant.",
  "confidence": 34.2,
  "entropy_ratio": 0.872
}
```

---

## 📁 Project Structure

```
src/
├── styles/
│   ├── globals.css       # Design tokens, animations, base styles
│   └── App.css           # Component-level styles
├── App.jsx               # Main app, all UI components
├── IntroScreen.jsx       # Animated landing/intro screen
└── main.jsx              # React entry point
```

---

## 🌱 Supported Plant Species

The model recognises 40+ medicinal plant species including Tulsi, Neem, Aloe Vera, Turmeric, Ginger, Ashwagandha, Brahmi, Moringa, and more. See the backend repository for the full species list.

---

## ⚠️ Disclaimer

Medi is intended for **educational and research purposes only**. Plant identification results should not be used as a substitute for advice from a qualified healthcare practitioner or botanist.

---

## 📄 License

MIT © [Rishi](https://github.com/rishi01811)
