import React, { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, ShieldCheck, FileText, CheckCircle2, HelpCircle } from 'lucide-react';

const AIAnalystPage = () => {
  const [targetAsset, setTargetAsset] = useState('192.168.1.105');
  const [brief, setBrief] = useState({
    executive_summary: "Automated AI investigation for target asset 192.168.1.105. Correlated 48 SSH auth failures followed by encoded PowerShell process invocation.",
    confirmed_evidence: [
      "CONFIRMED: 48 failed SSH authentication attempts from IP 192.168.1.105 (Log timestamp: 12:35:10).",
      "CONFIRMED: PowerShell process spawned with `-EncodedCommand` flag under PID 4920.",
      "CONFIRMED: VirusTotal intelligence match (42/70 positives) for external IP 185.220.101.5.",
      "CONFIRMED: Internal host 10.0.0.12 attempted outbound TCP handshake to port 443."
    ],
    ai_generated_hypothesis: [
      "HYPOTHESIS: Adversary achieved initial access via credential brute force or valid account abuse (T1110).",
      "HYPOTHESIS: PowerShell invocation attempted local memory injection or obfuscated payload download.",
      "HYPOTHESIS: Outbound TCP handshake represents potential C2 beaconing or staging exfiltration."
    ],
    relevant_mitre_techniques: [
      "T1110 - Brute Force",
      "T1059.001 - PowerShell Execution",
      "T1071.001 - Web Protocols (C2)"
    ],
    risk_assessment: "CRITICAL (Risk Score: 94/100). High likelihood of active adversary lateral movement.",
    recommended_remediation: [
      "Isolate host 192.168.1.105 immediately from internal subnets.",
      "Dump process memory for PID 4920 to analyze decoded payload.",
      "Revoke compromised Kerberos tickets & enforce MFA."
    ]
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">AI Security Threat Analyst Assistant</h2>
            <p className="text-xs text-slate-400">Automated LLM security brief generation strictly separating empirical evidence from AI hypotheses.</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={targetAsset}
            onChange={(e) => setTargetAsset(e.target.value)}
            placeholder="Target Asset IP or Incident ID..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs font-mono text-white"
          />
          <button className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Generate Brief</span>
          </button>
        </div>
      </div>

      {brief && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold font-mono text-white">Executive Summary</h3>
            <p className="text-xs font-mono text-slate-300">{brief.executive_summary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confirmed Telemetry Evidence */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
              <h3 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Confirmed Telemetry Evidence
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-200">
                {brief.confirmed_evidence.map((ev, i) => (
                  <li key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Generated Hypotheses */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-3">
              <h3 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                AI-Generated Hypotheses & Possibilities
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-200">
                {brief.ai_generated_hypothesis.map((hyp, i) => (
                  <li key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-amber-400">?</span>
                    <span>{hyp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalystPage;
