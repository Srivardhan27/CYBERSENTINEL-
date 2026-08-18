import React from 'react';
import { FileSpreadsheet, Download, Printer, ShieldCheck } from 'lucide-react';

const ReportsPage = () => {
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
            <h2 className="text-xl font-bold font-mono text-white">Security Report Generator & PDF Exporter</h2>
            <p className="text-xs text-slate-400">Generate executive SOC briefs, incident chronologies, and remediation advisories.</p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Export PDF Report</span>
        </button>
      </div>

      {/* Report Document Preview */}
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 text-slate-200 font-mono">
        <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-cyan-400">CYBERSENTINEL EXECUTIVE SECURITY BRIEF</h1>
            <p className="text-xs text-slate-400">Report Reference: CS-REP-2026-0818 | Generated: 2026-08-18 12:45:00 UTC</p>
          </div>
          <span className="px-3 py-1 rounded bg-rose-950 text-rose-400 border border-rose-500/30 text-xs font-bold">
            RESTRICTED - SOC INTERNAL
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase">1. Executive Summary</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            During the 24-hour monitoring period, CyberSentinel ingested 1,248 asset events across cloud and on-premise subnets.
            A total of 42 active alerts were generated, including 7 Critical severity events. 3 security incidents were opened, 1 was successfully contained, and 1 is under active investigation.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase">2. PhishGuard AI Telemetry</h3>
          <p className="text-xs text-slate-300">
            PhishGuard AI processed 158 multimodal scans (Email, URL, SMS, QR). 34 malicious credential harvesting vectors were automatically blocked before initial access execution.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase">3. Strategic Remediation Roadmap</h3>
          <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
            <li>Enforce MFA mandatory policy across all external SSH and VPN access gateways.</li>
            <li>Apply host isolation protocols to IP 192.168.1.105 until memory analysis is complete.</li>
            <li>Block external IP 185.220.101.5 across perimeter firewall access lists.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
