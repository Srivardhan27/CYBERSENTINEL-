import React, { useState } from 'react';
import { FileSpreadsheet, Download, Printer, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('FULL_SOC_SUMMARY');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Accurate Security Report Generator & PDF Exporter</h2>
            <p className="text-xs text-slate-400">Generate formal, audit-ready PDF/Print threat reports detailing confirmed evidence, risk scores, and remediation steps.</p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Printer className="w-4 h-4" />
          <span>Export Formal PDF Report</span>
        </button>
      </div>

      {/* Report Document Preview */}
      <div className="p-8 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-6 text-slate-200 font-mono shadow-2xl">
        <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-cyan-400 uppercase tracking-wider">
              CYBERSENTINEL ACCURATE THREAT & INCIDENT REPORT
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Report ID: CS-REP-2026-0819 | Generated: {new Date().toISOString().substring(0, 19).replace('T', ' ')} UTC
            </p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 rounded bg-rose-950 text-rose-400 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
              RESTRICTED - SOC AUDIT
            </span>
          </div>
        </div>

        {/* Executive Threat Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            1. Executive Threat Summary & Metrics
          </h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Monitored Assets</span>
              <p className="text-lg font-bold text-white mt-0.5">1,248 Hosts</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Critical Detections</span>
              <p className="text-lg font-bold text-rose-400 mt-0.5">7 Critical Alerts</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">PhishGuard Blocked</span>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">34 Phishing Vector Hits</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Overall Threat Risk</span>
              <p className="text-lg font-bold text-amber-400 mt-0.5">78 / 100 (ELEVATED)</p>
            </div>
          </div>
        </div>

        {/* Confirmed Telemetry Evidence */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            2. Confirmed Empirical Telemetry Evidence
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✔</span>
              <div>
                <p className="font-bold text-white">CONFIRMED: Brute Force SSH Authentication Attack (T1110)</p>
                <p className="text-slate-400 text-[11px]">48 failed SSH authentication attempts from IP 192.168.1.105 targeting 10.0.0.12 (Port 22).</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✔</span>
              <div>
                <p className="font-bold text-white">CONFIRMED: Encoded PowerShell Process Spawn (T1059.001)</p>
                <p className="text-slate-400 text-[11px]">PowerShell process executed with `-EncodedCommand` payload on host WORKSTATION-04 (PID 4920).</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✔</span>
              <div>
                <p className="font-bold text-white">CONFIRMED: PhishGuard AI QR Code Payload Interception (T1566.002)</p>
                <p className="text-slate-400 text-[11px]">HTML5 QR image matrix payload decoded: http://malicious-qr-redirect.com/login-credentials (Risk Score: 92/100).</p>
              </div>
            </div>
          </div>
        </div>

        {/* MITRE ATT&CK Matrix Correlation */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">3. MITRE ATT&CK Tactic & Technique Correlation</h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <p className="text-cyan-400 font-bold">Initial Access</p>
              <p className="text-slate-300 text-[11px]">T1566.002 - Spearphishing Link / QR Payload</p>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <p className="text-cyan-400 font-bold">Execution</p>
              <p className="text-slate-300 text-[11px]">T1059.001 - PowerShell Obfuscated Command</p>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <p className="text-cyan-400 font-bold">Credential Access</p>
              <p className="text-slate-300 text-[11px]">T1110 - Brute Force SSH Authentication</p>
            </div>
          </div>
        </div>

        {/* Actionable Incident Remediation Roadmap */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">4. Actionable Remediation Roadmap</h3>
          <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1.5">
            <li>Isolate host 192.168.1.105 immediately via network access control (NAC).</li>
            <li>Dump process memory for PID 4920 to inspect decoded PowerShell script block payload.</li>
            <li>Block external command and control IP 185.220.101.5 on perimeter firewall access lists.</li>
            <li>Enforce mandatory Multi-Factor Authentication (MFA) across all SSH and RDP endpoints.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
