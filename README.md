# CyberSentinel – AI-Powered Cloud SOC & Threat Intelligence Platform with Multimodal Phishing Detection

[![CyberSentinel Status](https://img.shields.io/badge/SOC_Platform-v1.0.0-00f0ff.svg?style=flat-square)](https://github.com/Srivardhan27/CYBERSENTINEL-)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-brightgreen.svg?style=flat-square&logo=vercel)](https://cybersentinel-mu.vercel.app/)
[![React + Vite](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61dafb.svg?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase_Auth_%2B_Firestore-ffca28.svg?style=flat-square)](https://firebase.google.com/)
[![FastAPI](https://img.shields.io/badge/Security_Engine-FastAPI-009688.svg?style=flat-square)](https://fastapi.tiangolo.com/)

CyberSentinel is an AI-assisted Security Operations Center (SOC) platform designed for real-time threat monitoring, security log normalization, machine-learning anomaly detection, incident response, vulnerability management, MITRE ATT&CK correlation, and multimodal phishing detection via **PhishGuard AI**.

> 🌐 **Live Vercel Production Platform**: [https://cybersentinel-mu.vercel.app/](https://cybersentinel-mu.vercel.app/)  
> 📁 **GitHub Repository**: [https://github.com/Srivardhan27/CYBERSENTINEL-](https://github.com/Srivardhan27/CYBERSENTINEL-)

> [!NOTE]  
> **Defensive Security & Lab Compliance:** This system is built strictly for defensive cybersecurity monitoring and authorized lab/educational environments. It uses synthetic/demo security telemetry and avoids any offensive exploitation, credential theft, or unauthorized scanning.

---

## 🌟 Key Features

- **SOC Operations Command Dashboard**: Real-time KPI metrics, active alert streams, risk indicators, and threat severity distribution.
- **Multimodal PhishGuard AI**: Dedicated engines for Email (RoBERTa + TF-IDF), URL (18 Feature Vectors), Website (DOM Audit), SMS/Smishing, QR Code Image Matrix Scanning, and Vishing Call Transcript Analysis.
- **Precision Threat Detection & Hashing**: Web Crypto API authentic SHA-256 file hashing, double-extension masquerade detection, and VirusTotal / AbuseIPDB threat feed aggregation.
- **Security Log Explorer**: Normalization of Windows, Linux, Firewall, SSH, and HTTP logs into standard JSON event formats.
- **Rule-Based Threat Detection**: Detection rules for brute force, port scans, suspicious PowerShell, and malicious IOC hits.
- **ML Anomaly Detection**: Isolation Forest & Random Forest models for login and network anomaly scoring.
- **MITRE ATT&CK Mapping**: Interactive mapping of security alerts to ATT&CK tactics & techniques (e.g., T1110, T1046, T1566.002).
- **Incident & Asset Management**: End-to-end incident lifecycles (NEW -> INVESTIGATING -> CONTAINED -> RESOLVED) and host vulnerability scoring.
- **AI Security Threat Analyst Assistant**: Automated LLM investigation briefs strictly separating **CONFIRMED EVIDENCE** from **AI HYPOTHESES**.
- **Role-Based Access Control (RBAC)**: Enforced `ADMIN`, `SECURITY_ANALYST`, and `VIEWER` roles with one-click demo role switching.

---

## 🌐 Production Deployment (Vercel)

The frontend is deployed to Vercel with SPA rewrites configured in `vercel.json`:

- **Production URL**: [https://cybersentinel-mu.vercel.app/](https://cybersentinel-mu.vercel.app/)

To deploy updates manually or automatically:
1. Connect [Srivardhan27/CYBERSENTINEL-](https://github.com/Srivardhan27/CYBERSENTINEL-) to your Vercel workspace (`srivardhan27s-projects`).
2. Set Root Directory to `frontend`.
3. Vercel automatically runs `npm run build` and deploys the production distribution.

---

## 📐 High-Level System Architecture

```text
                    CYBERSENTINEL
                         |
          +--------------+--------------+
          |                             |
     React/Vite                      FastAPI
     Frontend                    Security Engine
          |                             |
          |                 +-----------+-----------+
          |                 |           |           |
          |             Rule Engine  ML Engine  AI Analyst
          |                 |           |           |
          +-----------------+-----------+-----------+
                            |
                       Risk Engine
                            |
                    Threat Correlation
                            |
                     MITRE ATT&CK
                            |
                   Incident Management
                            |
                       Firestore
                            |
              +-------------+-------------+
              |             |             |
         Firebase Auth  Firestore     Storage
```

---

## 📁 Repository Structure

```text
cybersentinel/
├── frontend/                 # React + Vite SOC Frontend
│   ├── src/
│   │   ├── components/       # StatusBadges, StatCards, Navbar, Sidebar
│   │   ├── context/          # AuthContext (Firebase Auth + RBAC)
│   │   ├── firebase/         # Firebase Client SDK & Firestore Services
│   │   ├── layouts/          # SOCLayout wrapper
│   │   ├── pages/            # Dashboard, PhishGuard, IOC, AI Analyst, etc.
│   │   └── utils/            # Web Crypto Hashing, QR Matrix Decoder & Telemetry
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json           # Vercel SPA Routing Configuration
│   └── tailwind.config.js
├── fastapi/                  # Python FastAPI Security Engine
│   ├── app/
│   │   └── routers/          # Log Normalizer, PhishGuard, IOC, Risk, AI Analyst
│   └── requirements.txt
├── functions/                # Firebase Cloud Functions
├── ml/                       # Machine Learning Datasets & Models
├── firestore.rules           # Firestore RBAC Security Rules
├── firestore.indexes.json    # Firestore Compound Query Indexes
├── firebase.json             # Firebase Configuration (Hosting Disabled)
├── vercel.json               # Root Vercel Build Configuration
├── .env.example              # Environment Variable Template
└── README.md                 # Project Documentation
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Python**: 3.10+ (for backend & ML modules)

### 2. Frontend Setup
```bash
# Navigate to the frontend directory
cd cybersentinel/frontend

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will launch on `http://localhost:3000` (or `http://localhost:5173`).

---

## 🔐 Environment Configuration

Create a `.env` file inside `cybersentinel/` (or `cybersentinel/frontend/.env`) using `.env.example` as a template:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

> **Security Note:** Private API keys (`VIRUSTOTAL_API_KEY`, `AI_API_KEY`) belong strictly in backend FastAPI server environments and are never bundled into client-side code.
