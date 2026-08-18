from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/ioc", tags=["IOC Analyzer"])

class IocLookupRequest(BaseModel):
    value: str
    ioc_type: str = "AUTO" # IP, DOMAIN, URL, HASH

class IocAnalysisResult(BaseModel):
    value: str
    ioc_type: str
    reputation: str # MALICIOUS, SUSPICIOUS, BENIGN, UNKNOWN
    risk_score: int # 0 - 100
    threat_category: str
    first_seen: str
    last_seen: str
    virustotal_positives: int
    abuseipdb_confidence: int
    related_campaigns: List[str]
    related_alerts: List[str]
    mitre_techniques: List[str]

# Known synthetic IOC Database for predictable demo response
MOCK_MALICIOUS_DB = {
    "185.220.101.5": {
        "type": "IP",
        "reputation": "MALICIOUS",
        "score": 94,
        "category": "C2 Server / Tor Exit Node",
        "vt": 42,
        "abuse": 100,
        "campaigns": ["Operation Cobalt Strike", "APT29 Recon"],
        "alerts": ["ALT-8900", "ALT-8898"],
        "mitre": ["T1071.001", "T1090"]
    },
    "45.33.32.156": {
        "type": "IP",
        "reputation": "SUSPICIOUS",
        "score": 68,
        "category": "Scanner / Low Reputation Host",
        "vt": 12,
        "abuse": 75,
        "campaigns": ["Generic Mass Scan"],
        "alerts": ["ALT-8898"],
        "mitre": ["T1046"]
    },
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855": {
        "type": "HASH",
        "reputation": "BENIGN",
        "score": 0,
        "category": "Empty SHA-256 File Hash",
        "vt": 0,
        "abuse": 0,
        "campaigns": [],
        "alerts": [],
        "mitre": []
    }
}

@router.post("/analyze", response_model=IocAnalysisResult)
def analyze_ioc(request: IocLookupRequest):
    val = request.value.strip()
    if not val:
        raise HTTPException(status_code=400, detail="Empty IOC string.")

    # Check synthetic DB
    if val in MOCK_MALICIOUS_DB:
        data = MOCK_MALICIOUS_DB[val]
        return IocAnalysisResult(
            value=val,
            ioc_type=data["type"],
            reputation=data["reputation"],
            risk_score=data["score"],
            threat_category=data["category"],
            first_seen="2026-08-10 04:12:00",
            last_seen="2026-08-18 12:30:00",
            virustotal_positives=data["vt"],
            abuseipdb_confidence=data["abuse"],
            related_campaigns=data["campaigns"],
            related_alerts=data["alerts"],
            mitre_techniques=data["mitre"]
        )

    # Dynamic Analysis fallback
    inferred_type = "IP" if "." in val and len(val.split(".")) == 4 else ("HASH" if len(val) >= 32 else "DOMAIN")
    is_malicious = "malware" in val.lower() or "phish" in val.lower() or "c2" in val.lower()

    return IocAnalysisResult(
        value=val,
        ioc_type=inferred_type,
        reputation="MALICIOUS" if is_malicious else "SUSPICIOUS",
        risk_score=85 if is_malicious else 45,
        threat_category="Phishing Host / Suspicious Indicator" if is_malicious else "Uncategorized Intelligence Indicator",
        first_seen="2026-08-18 10:00:00",
        last_seen="2026-08-18 12:35:00",
        virustotal_positives=18 if is_malicious else 2,
        abuseipdb_confidence=80 if is_malicious else 15,
        related_campaigns=["CyberSentinel Telemetry Analysis"],
        related_alerts=["ALT-8902"],
        mitre_techniques=["T1566.002", "T1071.001"]
    )
