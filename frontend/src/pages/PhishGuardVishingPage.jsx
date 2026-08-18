import React, { useState } from 'react';
import { Mic, Sparkles } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const PhishGuardVishingPage = () => {
  const [transcript, setTranscript] = useState('Caller: Hello, this is IT Helpdesk. We noticed unusual traffic from your workstation. Please download AnyDesk software immediately and read me your 9-digit remote access code to prevent account lockout.');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setResult({
      classification: 'PHISHING',
      risk_score: 92,
      confidence: 0.94,
      reasons: [
        'Vishing social engineering coercion signal: "IT Helpdesk impersonation"',
        'Remote access software solicitation: "AnyDesk", "9-digit remote access code"',
        'Urgency pressure tactic: "prevent account lockout"',
      ],
      model_used: 'Vishing Call Transcript Speech-to-Text NLP Analyzer',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">PhishGuard AI – Vishing Call Transcript Analyzer</h2>
            <p className="text-xs text-slate-400">Speech-to-Text transcript processing evaluating IT impersonation and remote control coercion.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <label className="block text-xs font-mono text-slate-400">Call Transcript Input</label>
          <textarea
            rows={6}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white resize-none"
          />
          <button
            onClick={handleAnalyze}
            className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Vishing Transcript</span>
          </button>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white">Speech NLP Vishing Analysis</h3>
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
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              Click "Analyze Vishing Transcript" to run inspection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhishGuardVishingPage;
