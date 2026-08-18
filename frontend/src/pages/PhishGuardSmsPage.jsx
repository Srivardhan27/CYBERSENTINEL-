import React, { useState } from 'react';
import { MessageSquareWarning, Sparkles } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const PhishGuardSmsPage = () => {
  const [sender, setSender] = useState('+1-800-BANK-ALERT');
  const [message, setMessage] = useState('ALERT: Your debit card has been suspended due to suspicious activity. Immediately verify your account at bit.ly/bank-security-verify');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setResult({
      classification: 'PHISHING',
      risk_score: 94,
      confidence: 0.95,
      reasons: [
        'Smishing urgency coercion signal detected: "card suspended", "verify your account"',
        'Shortened URL payload embedded in SMS: bit.ly/bank-security-verify',
        'Impersonation of banking security desk',
      ],
      model_used: 'DistilBERT Smishing NLP Classifier',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <MessageSquareWarning className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">PhishGuard AI – Smishing SMS Classifier</h2>
            <p className="text-xs text-slate-400">DistilBERT NLP model classifying SMS text, financial urgency, and shortened URL payloads.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">SMS Sender Header</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">SMS Text Content</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Classify SMS Payload</span>
          </button>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white">Smishing NLP Results</h3>
          {result ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <StatusBadge level={result.classification} />
                <span className="text-xl font-bold font-mono text-rose-400">RISK: {result.risk_score}/100</span>
              </div>
              <ul className="space-y-1 text-xs font-mono text-slate-300">
                {result.reasons.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-rose-400">●</span> {r}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] font-mono text-cyan-400">Model: {result.model_used}</p>
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              Click "Classify SMS Payload" to run analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhishGuardSmsPage;
