import React, { useState } from 'react';
import { Globe2, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const PhishGuardWebsitePage = () => {
  const [targetUrl, setTargetUrl] = useState('http://login.corporate-update-portal.com');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setResult({
      classification: 'PHISHING',
      risk_score: 91,
      confidence: 0.97,
      dom_audit: {
        login_forms_detected: 2,
        password_fields: 2,
        external_js_scripts: 4,
        iframes_embedded: 1,
        domain_mismatch: true,
      },
      reasons: [
        'Detected password input form targeting corporate credentials on external domain',
        'Domain mismatch: corporate-update-portal.com does not match official company domain',
        'Suspicious external JS script loaded from unverified host',
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">PhishGuard AI – Website DOM Snapshot Analyzer</h2>
            <p className="text-xs text-slate-400">Audits DOM login forms, password inputs, external scripts, iframes, and domain mismatches.</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <label className="block text-xs font-mono text-slate-400">Target Website URL for DOM Inspection</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs font-mono text-white"
          />
          <button
            onClick={handleAnalyze}
            className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Audit Web Page DOM</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-xs font-mono text-slate-400">CLASSIFICATION VERDICT</span>
            <div className="flex items-center justify-between">
              <StatusBadge level={result.classification} />
              <span className="text-xl font-bold font-mono text-rose-400">RISK: {result.risk_score}/100</span>
            </div>
            <ul className="space-y-1 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
              {result.reasons.map((r, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-rose-400">●</span> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase">DOM Structural Audit Metrics</h3>
            <pre className="p-3 rounded-lg bg-slate-950 text-xs font-mono text-cyan-300">
              {JSON.stringify(result.dom_audit, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhishGuardWebsitePage;
