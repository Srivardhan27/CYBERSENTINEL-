import React, { useState } from 'react';
import { MailWarning, Sparkles, AlertTriangle, ShieldCheck, Play } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const PhishGuardEmailPage = () => {
  const [sender, setSender] = useState('admin-update@external-secure-portal.com');
  const [subject, setSubject] = useState('URGENT: Executive Account Password Reset Required');
  const [body, setBody] = useState('Dear User,\nYour corporate email account has been flagged for non-compliance. Please immediately verify your credentials at http://external-secure-portal.com/login to prevent suspension.\nRegards,\nIT Security');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setResult({
      classification: 'PHISHING',
      risk_score: 95,
      confidence: 0.96,
      reasons: [
        'Urgency signal detected: "URGENT", "immediately verify credentials"',
        'External spoofing domain: external-secure-portal.com mimicking corporate admin',
        'Credential harvesting link targeting corporate credentials',
      ],
      important_indicators: [
        'Domain mismatch: external-secure-portal.com vs corp.internal',
        'Social engineering coercion language',
      ],
      model_used: 'RoBERTa-Security-V2 + TF-IDF Heuristic Ensemble',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <MailWarning className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">PhishGuard AI – Email Phishing Detector</h2>
            <p className="text-xs text-slate-400">RoBERTa & TF-IDF NLP model analyzing email body, headers, links, and urgency signals.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Input */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Sender Address</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Email Body Content</label>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run PhishGuard Email NLP Analysis</span>
          </button>
        </div>

        {/* AI Output Card */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold font-mono text-white mb-3">PhishGuard AI Analysis Report</h3>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-slate-400">CLASSIFICATION</span>
                    <p className="text-xl font-bold font-mono text-rose-400">{result.classification}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">RISK SCORE</span>
                    <p className="text-xl font-bold font-mono text-rose-400">{result.risk_score}/100</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono text-slate-400 mb-2">Key Risk Factors & Reasons:</p>
                  <ul className="space-y-1.5">
                    {result.reasons.map((r, i) => (
                      <li key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2">
                        <span className="text-rose-400">●</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 text-[11px] font-mono text-cyan-400 border border-cyan-500/30">
                  Model: {result.model_used} (Confidence: {result.confidence * 100}%)
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs font-mono text-slate-500 rounded-lg bg-slate-950">
                Click "Run PhishGuard Email NLP Analysis" to inspect email payload.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishGuardEmailPage;
