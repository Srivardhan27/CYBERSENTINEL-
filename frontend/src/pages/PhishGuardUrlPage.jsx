import React, { useState } from 'react';
import { Globe, Sparkles, Printer, RefreshCw } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ScanReportModal from '../components/ScanReportModal';
import { executeRealTimeScan } from '../api/scanService';

const PhishGuardUrlPage = () => {
  const [urlInput, setUrlInput] = useState('http://185.220.101.5/login-verify-account-update');
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [reportModalData, setReportModalData] = useState(null);

  const handleAnalyze = async () => {
    if (!urlInput.trim()) return;
    setIsScanning(true);
    try {
      const resObj = await executeRealTimeScan({ input: urlInput, scanType: 'URL' });
      setResult(resObj);
    } catch (err) {
      console.error('URL scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {reportModalData && (
        <ScanReportModal reportData={reportModalData} onClose={() => setReportModalData(null)} />
      )}

      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">PhishGuard AI – URL Phishing Classifier</h2>
            <p className="text-xs text-slate-400">ML model evaluating domain entropy, IP hosts, typosquatting keywords, and length vectors.</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <label className="block text-xs font-mono text-slate-400">Target URL string for ML inspection</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs font-mono text-slate-100"
          />
          <button
            onClick={handleAnalyze}
            disabled={isScanning}
            className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
          >
            {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Classify URL</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">PREDICTION RESULT</span>
              <div className="flex items-center gap-2">
                <StatusBadge level={result.classification} />
                <button
                  onClick={() => setReportModalData(result)}
                  className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Report</span>
                </button>
              </div>
            </div>
            <p className="text-2xl font-bold font-mono text-rose-400">RISK SCORE: {result.risk_score}/100</p>
            <p className="text-xs font-mono text-slate-300">{result.model}</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase">Engineered Threat Evidence</h3>
            <div className="p-3 rounded-lg bg-slate-950 text-xs font-mono text-cyan-300 space-y-1">
              {result.confirmed_evidence.map((ev, i) => (
                <p key={i}>✔ {ev}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhishGuardUrlPage;
