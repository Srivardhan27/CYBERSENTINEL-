# Comprehensive Project Documentation Report

## CyberSentinel – AI-Powered Cloud SOC & Threat Intelligence Platform with Multimodal Phishing Detection

---

### 📌 Project Metadata
- **Project Title**: CyberSentinel
- **Full System Title**: CyberSentinel – AI-Powered Cloud SOC & Threat Intelligence Platform with Multimodal Phishing Detection
- **Live Vercel Production URL**: [https://cybersentinel-mu.vercel.app/](https://cybersentinel-mu.vercel.app/)
- **GitHub Repository**: [https://github.com/Srivardhan27/CYBERSENTINEL-](https://github.com/Srivardhan27/CYBERSENTINEL-)
- **Firebase Project ID**: `cbersentinel`
- **Primary Domain**: Defensive Cybersecurity, Security Operations Center (SOC), Threat Intelligence, Artificial Intelligence (AI/ML), Natural Language Processing (NLP), Cloud Security, Full-Stack Web Development.

---

## 1. Executive Summary

**CyberSentinel** is an enterprise-grade, AI-assisted Security Operations Center (SOC) platform designed to deliver real-time security monitoring, automated threat detection, machine-learning anomaly scoring, vulnerability management, MITRE ATT&CK correlation, and multimodal social engineering defense through an integrated **PhishGuard AI** engine.

The platform provides security analysts and SOC teams with a single pane of glass to ingest raw security logs (SSH, Windows EventViewer, Syslog, Apache), calculate authentic Web Crypto SHA-256 file hashes, decode HTML5 QR code matrix payloads, inspect malicious URLs and domains against VirusTotal and AbuseIPDB threat feeds, and generate structured AI investigation briefs that rigorously separate **CONFIRMED TELEMETRY EVIDENCE** from **AI-GENERATED HYPOTHESES**.

CyberSentinel is built strictly for defensive cybersecurity operations and authorized lab environments, utilizing realistic synthetic telemetry without implementing offensive attack vectors or credential theft.

---

## 2. System Architecture & High-Level Design

The system follows a decoupled, modular multi-tier architecture separating the React SPA Frontend, Firebase Authentication & Firestore database, Python FastAPI Security Engine, and Machine Learning classifiers.

```text
                                CYBERSENTINEL PLATFORM
                                           |
            +------------------------------+------------------------------+
            |                                                             |
     React 18 + Vite                                              Python FastAPI
    SOC Web Frontend                                              Security Engine
            |                                                             |
            |                         +-------------------+---------------+-------------------+
            |                         |                   |               |                   |
            |                   Log Normalizer      Rule Engine       ML Engine           AI Analyst
            |                         |                   |               |                   |
            +-------------------------+-------------------+---------------+-------------------+
                                                          |
                                                     Risk Engine
                                                          |
                                                 Threat Correlation
                                                          |
                                                  MITRE ATT&CK Matrix
                                                          |
                                                 Incident Management
                                                          |
                                                Firestore DB & Auth
                                                          |
                                            +-------------+-------------+
                                            |             |             |
                                       Firebase Auth  Firestore     Storage
```

### Data Flow Diagram (DFD)
1. **Ingestion Layer**: Raw syslogs, EML files, file uploads, URLs, and QR code images are received by the frontend or FastAPI endpoints.
2. **Parsing & Normalization Layer**: Telemetry is parsed into a normalized JSON schema (`timestamp`, `source_ip`, `destination_ip`, `username`, `event_type`, `port`, `action`, `severity`).
3. **Detection & Intelligence Layer**: Evaluated simultaneously against static detection rules (`R-SSH-BRUTE`, `R-POWERSHELL-ENCODED`), ML anomaly models (Isolation Forest / Random Forest), and threat intelligence APIs (VirusTotal / AbuseIPDB).
4. **Risk & Correlation Engine**: Generates a 0-100 composite risk score based on alert severity, asset criticality, CVSS rating, and phishing probabilities.
5. **AI Threat Analyst**: Consolidates alerts into structured briefs categorizing confirmed evidence versus hypotheses.
6. **Persistence & Presentation**: Stores alerts, incidents, and audit logs in Firestore; displays real-time statistics on the Vercel-hosted SOC dashboard.

---

## 3. Technology Stack Matrix

| Layer | Component | Technologies Used | Description |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | Framework | React 18, Vite 6 | High-performance Single Page Application (SPA) |
| | Styling | Tailwind CSS 3, PostCSS | Custom dark cyber-SOC aesthetic with neon glowing status pills |
| | Data Viz | Recharts 2 | Interactive 24h Alert Timelines, Donut Charts, and MITRE Bar Charts |
| | Icons | Lucide React | Cyber threat icons, badges, and navigation symbols |
| | Routing | React Router DOM 6 | Client-side routing with Vercel SPA rewrites |
| **Backend & Engine** | API Server | Python 3.10+, FastAPI, Uvicorn | Asynchronous RESTful security engine APIs |
| | Security Tools | Scapy, PyShark, OpenCV | Defensive network packet inspection & image processing |
| **Artificial Intelligence** | NLP | Transformers, BERT, RoBERTa, NLTK | Phishing email body urgency & text sentiment analysis |
| | ML | Scikit-learn, Pandas, NumPy, Joblib | Isolation Forest, Random Forest URL feature classification |
| | Explainable AI | LIME / Feature Vectors | Provides clear explanation reasons for ML predictions |
| **Database & Auth** | Database | Firebase Firestore | NoSQL real-time document store for 15 core collections |
| | Auth | Firebase Authentication | Email/Password auth with Role-Based Access Control (RBAC) |
| **Deployment** | Production | Vercel | Production hosting for frontend ([https://cybersentinel-mu.vercel.app/](https://cybersentinel-mu.vercel.app/)) |
| | Repository | GitHub | Source control & CI/CD ([Srivardhan27/CYBERSENTINEL-](https://github.com/Srivardhan27/CYBERSENTINEL-)) |

---

## 4. Core Platform Modules & Functional Detailed Analysis

### 4.1 SOC Operations Command Dashboard (`/dashboard`)
- **Key Metrics**: Total Monitored Assets (1,248), Active Alerts (42), Critical Alerts (7), Open Incidents (3), Critical Vulnerabilities (12), PhishGuard Scans (158), Threat Posture Level (`ELEVATED`), Risk Score (`78/100`).
- **Live Cyber Attack Stream Matrix**: Displays active simulated attack vectors originating from global IP nodes (Moscow, Ashburn, Tokyo, Frankfurt) targeting internal servers.
- **One-Click SOC Incident Controls**: Interactive countermeasures allowing analysts to trigger host network isolation, block C2 IPs on edge firewalls, and enforce mandatory MFA.

### 4.2 Multimodal PhishGuard AI Suite (`/phishguard/*`)
- **Email Phishing Detector**: RoBERTa + TF-IDF model processing EML file uploads, sender domain spoofing (`admin-update@external-secure-portal.com` vs `@corp.internal`), and urgency coercion language.
- **URL Phishing Classifier**: Random Forest model analyzing 18 engineered features (domain entropy, raw IP host presence, typosquatting keywords, URL length > 75 chars).
- **QR Code (Quishing) Scanner**: HTML5 Canvas QR matrix decoder scanning uploaded image files (PNG/JPG) to extract embedded URL payloads and evaluate threat risks.
- **Website Snapshot DOM Analyzer**: Inspects DOM login forms, password input fields, external JS scripts, iframes, and domain mismatches.
- **SMS Smishing & Vishing Transcript Analyzer**: DistilBERT NLP text analysis evaluating prize fraud, shortened URL links, and IT helpdesk phone impersonation.

### 4.3 Security Log Normalizer & Explorer (`/log-explorer`)
- Ingests raw auth.log, Windows EventViewer XML/JSON, Linux syslog, Apache access logs, and firewall drop traffic.
- Normalizes logs into standardized JSON schema with automated regex extraction for source/destination IPs, usernames, ports, protocols, and severity.

### 4.4 IOC Reputation & Threat Intelligence Aggregator (`/ioc-analyzer` & `/threat-intelligence`)
- Real client-side Web Crypto API (`crypto.subtle.digest('SHA-256')`) computing authentic SHA-256 hashes of any uploaded file in real-time.
- Multi-source indicator aggregation from VirusTotal detection ratios (e.g. 42/70 engine hits) and AbuseIPDB confidence scores (100% malicious confidence).

### 4.5 Centralized Cyber Risk Engine & Simulator (`/risk-analysis`)
- Calculates normalized composite risk scores (0-100) using the weighted formula:
  $$\text{Risk Score} = (0.35 \times \text{Alert Severity}) + (0.25 \times \text{Asset Criticality}) + (0.20 \times \text{IOC Reputation}) + (0.10 \times \text{ML Anomaly}) + (0.10 \times \text{Phishing Score})$$
- Interactive Risk Score Simulator sliders enabling real-time risk score modeling.

### 4.6 MITRE ATT&CK Matrix Mapping (`/mitre`)
- Maps active telemetry alerts to adversary tactics (Initial Access, Execution, Credential Access, Discovery, Command & Control) and techniques (`T1110`, `T1059.001`, `T1046`, `T1566.002`, `T1071.001`).

### 4.7 AI Security Threat Analyst Assistant (`/ai-analyst`)
- Automated LLM brief generation enforcing strict safety separation:
  - **CONFIRMED TELEMETRY EVIDENCE**: Empirical log lines, process PIDs, hash matches, IP handshakes.
  - **AI-GENERATED HYPOTHESES**: Potential attack scenarios, initial access vectors, and lateral movement possibilities.
- Provides quick target preset buttons (`192.168.1.105`, `10.0.4.88`, `185.220.101.5`, `INC-4091`).

### 4.8 Security Reports Generator & PDF Export (`/reports`)
- Generates formal, audit-ready threat reports detailing executive metrics, confirmed evidence, MITRE correlations, and remediation roadmaps.
- Includes one-click `Export Formal PDF Report` printable export (`window.print()`).

---

## 5. Security, RBAC & Firestore Database Schema

### Role-Based Access Control (RBAC) Matrix

| Feature / Module | ADMIN | SECURITY_ANALYST | VIEWER |
| :--- | :--- | :--- | :--- |
| **SOC Dashboard & Charts** | Read / Write | Read Only | Read Only |
| **Log Explorer & IOC Lookup** | Full Access | Full Access | Read Only |
| **PhishGuard AI Scanners** | Full Access | Full Access | Read Only |
| **Incident Management** | Full Control (Create/Close) | Update Status / Assign | Read Only |
| **Detection Rules & Settings** | Edit Rules / Config | View Rules | Read Only |
| **User Role Management** | Full Access | No Access | No Access |

### Firestore Database Collections (`firestore.rules`)
1. `users`: User profiles and assigned RBAC roles (`ADMIN`, `SECURITY_ANALYST`, `VIEWER`).
2. `assets`: Monitored hosts, IP mappings, OS fingerprints, criticality ratings (1-5).
3. `logs`: Normalized security log events.
4. `alerts`: Active detection rules alerts.
5. `incidents`: Incident management board documents.
6. `iocs`: Malicious IP, domain, URL, and hash indicators.
7. `vulnerabilities`: CVE records and CVSS ratings.
8. `mitreTechniques`: MITRE ATT&CK tactic mappings.
9. `threatIntelligence`: Aggregated VirusTotal and AbuseIPDB feeds.
10. `riskAssessments`: Historical risk engine calculations.
11. `phishingScans`: PhishGuard AI scan records.
12. `networkEvents`: Packet stream telemetry.
13. `reports`: Generated security PDF report metadata.
14. `auditLogs`: Immutable system action audit logs.
15. `detectionRules`: Active detection rule configurations.

---

## 6. Installation & Deployment Guide

### Local Development Setup
```bash
# 1. Clone the repository
git clone https://github.com/Srivardhan27/CYBERSENTINEL-.git
cd CYBERSENTINEL-/frontend

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

### Production Deployment on Vercel
1. Project is deployed live on Vercel at **[https://cybersentinel-mu.vercel.app/](https://cybersentinel-mu.vercel.app/)**.
2. Vercel SPA routing is configured via `vercel.json`:
```json
{
  "buildCommand": "if [ -d \"frontend\" ]; then cd frontend && npm run build; else npm run build; fi",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 7. Verification & Testing Results

- **Build Verification**: `npm run build` compiled **2,248 modules** into `dist/` with **0 errors**.
- **Cryptographic Hashing Test**: Tested file hashing via Web Crypto API; authentic SHA-256 hashes generated instantly.
- **QR Code Matrix Scanning Test**: Tested HTML5 Canvas image reader; successfully decoded embedded QR link payloads.
- **Route Rewrites Test**: Verified SPA routing on Vercel across all sub-routes (`/dashboard`, `/phishguard`, `/ioc-analyzer`, `/ai-analyst`, `/reports`, `/settings`).

---

## 8. Conclusion & Future Enhancements

CyberSentinel successfully demonstrates a comprehensive, portfolio-ready Security Operations Center platform combining modern frontend development, cloud services, threat intelligence APIs, and machine learning.

### Future Scope
- Integration of real-time WebSocket packet capture streaming.
- Expansion of BERT/RoBERTa deep learning models for automated email attachment sandbox detonation analysis.
- Multi-tenant enterprise SOC organization partitioning.
