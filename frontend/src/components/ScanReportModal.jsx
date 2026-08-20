import React from 'react';
import { Download, Printer, ShieldAlert, CheckCircle2, AlertTriangle, X, FileText } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ScanReportModal = ({ reportData, onClose }) => {
  if (!reportData) return null;

  const handlePrint = () => {
    window.print();
  };

  const isMalicious = reportData.classification === 'PHISHING' || reportData.classification === 'MALICIOUS' || (reportData.risk_score || reportData.riskScore || 0) >= 75;
  const isSuspicious = !isMalicious && ((reportData.classification === 'SUSPICIOUS') || (reportData.risk_score || reportData.riskScore || 0) >= 45);

  const verdictText = isMalicious ? 'MALICIOUS' : isSuspicious ? 'SUSPICIOUS' : 'CLEAN / LEGITIMATE';
  const riskVal = reportData.risk_score || reportData.riskScore || (isMalicious ? 92 : isSuspicious ? 60 : 10);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 text-slate-100 font-mono shadow-2xl space-y-6 relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                CYBERSENTINEL THREAT SCAN INSPECTION REPORT
              </h2>
              <p className="text-xs text-slate-400">
                Scan ID: {reportData.id || `SCN-${Date.now().toString().substring(6)}`} | Timestamp: {reportData.timestamp || new Date().toISOString().substring(0, 19).replace('T', ' ')}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Summary Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Target Artifact</span>
            <p className="text-xs font-bold text-cyan-400 truncate mt-1">{reportData.target || reportData.value || 'Artifact'}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Scan Vector</span>
            <p className="text-xs font-bold text-white mt-1">{reportData.type || 'SECURITY_SCAN'}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Threat Verdict</span>
            <div className="mt-1 flex justify-center">
              <StatusBadge level={verdictText} />
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Risk Score</span>
            <p className={`text-lg font-bold mt-0.5 ${isMalicious ? 'text-rose-400' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'}`}>
              {riskVal}/100
            </p>
          </div>
        </div>

        {/* Confirmed Evidence */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            Confirmed Telemetry Evidence & Reasons
          </h3>
          <div className="space-y-1.5 text-xs">
            {(reportData.confirmed_evidence || reportData.reasons || ['Clean structure detected.']).map((ev, i) => (
              <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✔</span>
                <span className="text-slate-200">{ev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Execution Model */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">AI Execution Engine:</span>
          <span className="text-cyan-400 font-bold">{reportData.model || 'PhishGuard-Ensemble-ML'}</span>
        </div>

        {/* Recommended Action Roadmap */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Remediation & Analyst Actions</h3>
          <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
            {isMalicious ? (
              <>
                <li>Block artifact destination URL/IP across edge firewalls and email gateways.</li>
                <li>Quarantine sender handle and notify SOC incident response team.</li>
                <li>Revoke active session tokens for targeted user accounts.</li>
              </>
            ) : isSuspicious ? (
              <>
                <li>Monitor endpoint traffic for secondary network connections.</li>
                <li>Apply strict perimeter URL filtering and request user MFA confirmation.</li>
              </>
            ) : (
              <li>Artifact verified clean; no defensive isolation required.</li>
            )}
          </ul>
        </div>

        {/* Export Buttons */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <span className="text-[10px] text-slate-500">CYBERSENTINEL DEFENSIVE SOC REPORT</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Download / Print PDF Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanReportModal;
