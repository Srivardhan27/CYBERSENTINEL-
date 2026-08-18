from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter(prefix="/api/v1/risk", tags=["Risk Engine"])

class RiskCalculationRequest(BaseModel):
    alert_severity: str = "HIGH" # LOW, MEDIUM, HIGH, CRITICAL
    asset_criticality: int = 4 # 1 - 5
    ioc_reputation_score: int = 70 # 0 - 100
    ml_anomaly_score: float = 0.85 # 0.0 - 1.0
    phishing_risk_score: int = 0 # 0 - 100
    mitre_count: int = 2

class RiskCalculationResult(BaseModel):
    overall_risk_score: int # 0 - 100
    risk_level: str # LOW, MEDIUM, HIGH, CRITICAL
    breakdown: Dict[str, float]
    explanation: str

@router.post("/calculate", response_model=RiskCalculationResult)
def calculate_risk_score(request: RiskCalculationRequest):
    # Weight factors
    severity_weights = {"LOW": 10, "MEDIUM": 35, "HIGH": 70, "CRITICAL": 100}
    sev_score = severity_weights.get(request.alert_severity.upper(), 50)

    asset_weight = request.asset_criticality * 20 # Max 100
    ml_weight = request.ml_anomaly_score * 100

    # Weighted Formula
    overall = (
        (sev_score * 0.35) +
        (asset_weight * 0.25) +
        (request.ioc_reputation_score * 0.20) +
        (ml_weight * 0.10) +
        (request.phishing_risk_score * 0.10)
    )

    overall = min(100, max(0, round(overall)))

    level = "LOW"
    if overall >= 75:
        level = "CRITICAL"
    elif overall >= 50:
        level = "HIGH"
    elif overall >= 25:
        level = "MEDIUM"

    return RiskCalculationResult(
        overall_risk_score=overall,
        risk_level=level,
        breakdown={
            "Alert Severity Weight (35%)": round(sev_score * 0.35, 1),
            "Asset Criticality Weight (25%)": round(asset_weight * 0.25, 1),
            "IOC Reputation Weight (20%)": round(request.ioc_reputation_score * 0.20, 1),
            "ML Anomaly Weight (10%)": round(ml_weight * 0.10, 1),
            "Phishing Score Weight (10%)": round(request.phishing_risk_score * 0.10, 1)
        },
        explanation=f"Generated risk score {overall}/100 ({level}) based on {request.alert_severity} alert severity on Criticality-{request.asset_criticality} asset coupled with high ML anomaly confidence."
    )
