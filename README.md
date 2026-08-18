# CyberSentinel – AI-Powered Cloud SOC & Threat Intelligence Platform with Multimodal Phishing Detection

[![CyberSentinel Status](https://img.shields.io/badge/SOC_Platform-v1.0.0-00f0ff.svg?style=flat-square)](https://github.com/)
[![React + Vite](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61dafb.svg?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase_Auth_%2B_Firestore-ffca28.svg?style=flat-square)](https://firebase.google.com/)
[![FastAPI](https://img.shields.io/badge/Security_Engine-FastAPI-009688.svg?style=flat-square)](https://fastapi.tiangolo.com/)

CyberSentinel is an AI-assisted Security Operations Center (SOC) platform designed for real-time threat monitoring, security log normalization, machine-learning anomaly detection, incident response, vulnerability management, MITRE ATT&CK correlation, and multimodal phishing detection via **PhishGuard AI**.

> [!NOTE]  
> **Defensive Security & Lab Compliance:** This system is built strictly for defensive cybersecurity monitoring and authorized lab/educational environments. It uses synthetic/demo security telemetry and avoids any offensive exploitation, credential theft, or unauthorized scanning.

---

## 🌟 Key Features

- **SOC Operations Command Dashboard**: Real-time KPI metrics, active alert streams, risk indicators, and threat severity distribution.
- **Multimodal PhishGuard AI**: Dedicated engine for Email, URL, Website, SMS/Smishing, QR Code (Quishing), and Vishing transcript analysis.
- **Security Log Explorer**: Normalization of Windows, Linux, Firewall, SSH, and HTTP logs into standard JSON event formats.
- **Rule-Based Threat Detection**: Detection rules for brute force, port scans, suspicious PowerShell, and malicious IOC hits.
- **ML Anomaly Detection**: Isolation Forest & Random Forest models for login and network anomaly scoring.
- **MITRE ATT&CK Mapping**: Interactive mapping of security alerts to ATT&CK tactics & techniques (e.g., T1110, T1046, T1566.002).
- **Incident & Asset Management**: End-to-end incident lifecycles (NEW -> INVESTIGATING -> CONTAINED -> RESOLVED) and host vulnerability scoring.
- **Role-Based Access Control (RBAC)**: Enforced `ADMIN`, `SECURITY_ANALYST`, and `VIEWER` roles.

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
│   │   ├── pages/            # DashboardPage, PhishGuard, IOCAnalyzer, etc.
│   │   ├── layouts/          # SOCLayout wrapper
│   │   ├── utils/            # Mock telemetry generators & helpers
│   │   ├── App.jsx           # Master route matrix
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── functions/                # Firebase Cloud Functions
├── fastapi/                  # Python FastAPI Security Engine
├── ml/                       # Machine Learning Datasets & Models
├── firestore.rules           # Firestore RBAC Security Rules
├── firestore.indexes.json    # Firestore Compound Query Indexes
├── firebase.json             # Firebase Suite Configuration (Hosting added in optional phase)
├── .env.example              # Environment Variable Template
└── README.md                 # Documentation
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

---

## 📋 Verification Checklist (Phase 1)

- [x] React 18 + Vite project established
- [x] Tailwind CSS dark cybersecurity SOC theme styled
- [x] Lucide React icons & Recharts visualizations integrated
- [x] Responsive layout with collapsible sidebar & navigation drawer built
- [x] SOC Dashboard with KPI cards, 24-hour alert timeline, and real-time alert feed running
- [x] Router configured with sub-routes for 20+ SOC pages
- [x] Synthetic security telemetry populated
- [x] Clean execution on localhost without build errors
