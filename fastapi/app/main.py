"""
CyberSentinel FastAPI Security Operations Engine
Entry point for REST & WebSocket security APIs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import logs, phishguard, ioc, risk, ai_analyst

app = FastAPI(
    title="CyberSentinel Security Engine API",
    description="AI-Powered Cloud SOC, ML Anomaly Detection & Threat Intelligence Backend",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(logs.router)
app.include_router(phishguard.router)
app.include_router(ioc.router)
app.include_router(risk.router)
app.include_router(ai_analyst.router)

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "system": "CyberSentinel Security Engine API",
        "mode": "DEFENSIVE_AUTHORIZED_LAB_ENVIRONMENT",
        "modules": [
            "Log Normalizer",
            "PhishGuard AI Engine",
            "IOC Reputation Analyzer",
            "Risk Engine",
            "AI Threat Analyst Assistant"
        ]
    }

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "service": "CyberSentinel FastAPI Engine"}
