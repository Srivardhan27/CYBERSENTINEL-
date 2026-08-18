import React, { useState } from 'react';
import { QrCode, Upload, Sparkles, AlertTriangle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const PhishGuardQrPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const handleSimulateQrUpload = () => {
    setScanResult({
      qr_decoded_url: 'http://malicious-qr-redirect.com/login-credentials',
      classification: 'PHISHING',
      risk_score: 88,
      confidence: 0.95,
      reasons: [
        'Extracted embedded QR URL payload: http://malicious-qr-redirect.com/login-credentials',
        'Domain flagged for phishing credential harvesting',
        'Redirect mask bypassing mobile perimeter email filters',
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">PhishGuard AI – QR Code Phishing (Quishing) Scanner</h2>
            <p className="text-xs text-slate-400">Upload QR image, extract matrix URL payload, and run ML threat classification.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-8 rounded-xl bg-slate-900/80 border border-dashed border-slate-800 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-200">Upload QR Code Image (PNG/JPG)</p>
            <p className="text-[11px] text-slate-500">Extracts hidden URL payload automatically</p>
          </div>
          <button
            onClick={handleSimulateQrUpload}
            className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs"
          >
            Select Sample QR Code Image
          </button>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white">Decoded QR Matrix Analysis</h3>
          {scanResult ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-slate-400">DECODED PAYLOAD URL</span>
                <p className="text-sm font-bold font-mono text-cyan-400 break-all mt-1">{scanResult.qr_decoded_url}</p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-rose-950/40 border border-rose-500/30">
                <span className="text-xs font-mono text-rose-300">THREAT VERDICT</span>
                <StatusBadge level={scanResult.classification} />
              </div>

              <ul className="space-y-1 text-xs font-mono text-slate-300">
                {scanResult.reasons.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-rose-400">●</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              Upload a QR image to extract payload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhishGuardQrPage;
