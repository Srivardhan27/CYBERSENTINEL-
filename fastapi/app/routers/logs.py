from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import re
from datetime import datetime

router = APIRouter(prefix="/api/v1/logs", tags=["Security Log Explorer"])

class LogIngestRequest(BaseModel):
    raw_log: str
    log_type: str = "AUTO" # AUTH, WINDOWS, LINUX, FIREWALL, WEB, APPLICATION

class NormalizedLogEvent(BaseModel):
    timestamp: str
    source_ip: str
    destination_ip: str
    username: str
    hostname: str
    event_type: str
    port: int
    protocol: str
    action: str
    status: str
    severity: str
    raw_snippet: str

@router.post("/normalize", response_model=NormalizedLogEvent)
def normalize_security_log(request: LogIngestRequest):
    raw = request.raw_log.strip()
    if not raw:
        raise HTTPException(status_code=400, detail="Empty log string provided.")

    # Default Normalized Template
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    normalized = NormalizedLogEvent(
        timestamp=now_str,
        source_ip="10.0.0.45",
        destination_ip="10.0.0.1",
        username="unknown",
        hostname="WORKSTATION-01",
        event_type="GENERIC_LOG",
        port=80,
        protocol="TCP",
        action="ALLOW",
        status="INFO",
        severity="LOW",
        raw_snippet=raw[:150]
    )

    # RegEx Extractors
    ip_matches = re.findall(r'\b(?:\d{1,3}\.){3}\d{1,3}\b', raw)
    if ip_matches:
        normalized.source_ip = ip_matches[0]
        if len(ip_matches) > 1:
            normalized.destination_ip = ip_matches[1]

    # SSH / Auth Log Patterns
    if "Failed password" in raw or "sshd" in raw:
        normalized.event_type = "AUTHENTICATION_FAILURE"
        normalized.port = 22
        normalized.protocol = "SSH"
        normalized.action = "DENY"
        normalized.status = "FAILED"
        normalized.severity = "HIGH"
        user_match = re.search(r'for (?:invalid user )?(\w+)', raw)
        if user_match:
            normalized.username = user_match.group(1)

    # Windows EventViewer Powershell Patterns
    elif "powershell" in raw.lower() or "encodedcommand" in raw.lower():
        normalized.event_type = "SUSPICIOUS_COMMAND_EXECUTION"
        normalized.protocol = "LOCAL"
        normalized.action = "EXECUTE"
        normalized.status = "FLAGGED"
        normalized.severity = "CRITICAL"
        normalized.username = "SYSTEM"

    # Firewall / Port Scan Patterns
    elif "BLOCK" in raw or "DROP" in raw or "SYN_SENT" in raw:
        normalized.event_type = "FIREWALL_DROP"
        normalized.protocol = "TCP"
        normalized.action = "BLOCK"
        normalized.status = "DENIED"
        normalized.severity = "MEDIUM"

    return normalized
