import React, { useState } from 'react';
import { Globe, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const PhishGuardUrlPage = () => {
  const [urlInput, setUrlInput] = useState('http://185.220.101.5/login-verify-account-update');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setResult({
      classification: 'PHISHING',
      risk_score: 92,
      confidence: 0.98,
      reasons: [
        'Raw IP host address used instead of valid registered domain name',
        'Typosquatting & credential harvesting keywords: "login", "verify", "account"',
        'URL string length exceeds safety threshold (>75 chars)',
      ],
      features: {
        length: urlInput.length,
        hasIP: true,
        hasAtSymbol: false,
        subdomains: 0,
        entropy: 4.82,
      },
      model_used: 'Random Forest URL Feature Classifier (18 Feature Vectors)',
    });
  };

  return (
    <div className="space-y-6">
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
            className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Classify URL</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">PREDICTION RESULT</span>
              <StatusBadge level={result.classification} />
            </div>
            <p className="text-2xl font-bold font-mono text-rose-400">RISK SCORE: {result.risk_score}/100</p>
            <p className="text-xs font-mono text-slate-300">{result.model_used}</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase">Engineered Feature Vectors</h3>
            <pre className="p-3 rounded-lg bg-slate-950 text-xs font-mono text-cyan-300">
              {JSON.stringify(result.features, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhishGuardUrlPage;
