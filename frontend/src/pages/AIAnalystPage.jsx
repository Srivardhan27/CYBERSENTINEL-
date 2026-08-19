import React, { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, ShieldCheck, FileText, CheckCircle2, HelpCircle, Layers, Shield, RefreshCw } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const PRESET_TARGETS = [
  { id: '192.168.1.105', label: '192.168.1.105 (SSH Brute Force)' },
  { id: '10.0.4.88', label: '10.0.4.88 (Encoded PowerShell)' },
  { id: '185.220.101.5', label: '185.220.101.5 (C2 IP Hit)' },
  { id: 'INC-4091', label: 'INC-4091 (Critical Incident)' },
];

const AIAnalystPage = () => {
  const [targetAsset, setTargetAsset] = useState('192.168.1.105');
  const [isGenerating, setIsGenerating] = useState(false);
  const [brief, setBrief] = useState({
    target: '192.168.1.105',
    executive_summary: "Automated AI investigation for target asset 192.168.1.105. Correlated 48 SSH authentication failures followed by obfuscated PowerShell execution.",
    confirmed_evidence: [
      "CONFIRMED: 48 failed SSH authentication attempts from IP 192.168.1.105 (Log timestamp: 12:35:10).",
      "CONFIRMED: PowerShell process spawned with `-EncodedCommand` flag under PID 4920 on host WORKSTATION-04.",
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
      "T1071.001 - Web Protocols (C2)",
      "T1078 - Valid Accounts"
    ],
    risk_assessment: "CRITICAL (Risk Score: 94/100). High likelihood of active adversary lateral movement.",
    riskScore: 94,
    recommended_remediation: [
      "Isolate host 192.168.1.105 immediately from internal subnets via NAC.",
      "Dump process memory for PID 4920 to analyze decoded script block payload.",
      "Revoke compromised Kerberos tickets & enforce mandatory Multi-Factor Authentication (MFA)."
    ]
  });

  const handleGenerateBrief = (inputTarget) => {
    const query = inputTarget || targetAsset;
    if (!query.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const targetStr = query.trim();

      if (targetStr.includes('10.0.4.88')) {
        setBrief({
          target: targetStr,
          executive_summary: `AI Security Brief for ${targetStr}: Detected suspicious PowerShell execution with encoded script blocks running under SYSTEM account.`,
          confirmed_evidence: [
            `CONFIRMED: Process Event 4104 spawned 'powershell.exe -EncodedCommand' on host ${targetStr}.`,
            'CONFIRMED: Base64 payload decoded to IEX(New-Object Net.WebClient).DownloadString.',
            'CONFIRMED: Outbound HTTP request initiated to external host 185.220.101.5.'
          ],
          ai_generated_hypothesis: [
            'HYPOTHESIS: Adversary executing fileless memory-only stager (Empire / Cobalt Strike framework).',
            'HYPOTHESIS: Local privilege escalation attempted via token manipulation.'
          ],
          relevant_mitre_techniques: ['T1059.001 - PowerShell', 'T1027 - Obfuscated Files'],
          risk_assessment: 'HIGH (Risk Score: 88/100). Suspicious script execution detected.',
          riskScore: 88,
          recommended_remediation: [
            'Enable PowerShell Constrained Language Mode (CLM).',
            'Terminate process tree under PID 4920.',
            'Block IP 185.220.101.5 on perimeter firewall.'
          ]
        });
      } else if (targetStr.includes('185.220.101.5') || targetStr.includes('C2')) {
        setBrief({
          target: targetStr,
          executive_summary: `AI Security Brief for Threat Indicator ${targetStr}: Flagged active Command & Control infrastructure matching VirusTotal threat feeds.`,
          confirmed_evidence: [
            `CONFIRMED: IP ${targetStr} matches 42/70 security engines on VirusTotal.`,
            `CONFIRMED: AbuseIPDB confidence score is 100% (Tor Exit Node / C2 Server).`,
            'CONFIRMED: Multiple internal hosts attempted SSL TLS handshake to this host.'
          ],
          ai_generated_hypothesis: [
            'HYPOTHESIS: External C2 server coordinating multi-host compromised botnet staging.',
            'HYPOTHESIS: Periodic HTTPS traffic indicates heartbeat beaconing interval.'
          ],
          relevant_mitre_techniques: ['T1071.001 - Web Protocols (C2)', 'T1090 - Proxy'],
          risk_assessment: 'CRITICAL (Risk Score: 96/100). Malicious C2 infrastructure confirmed.',
          riskScore: 96,
          recommended_remediation: [
            `Block IP ${targetStr} permanently across all edge firewalls.`,
            'Flush internal DNS resolver cache.',
            'Inspect SSL traffic logs for connected endpoints.'
          ]
        });
      } else {
        setBrief({
          target: targetStr,
          executive_summary: `Automated AI investigation brief generated for ${targetStr}: Correlated SSH authentication anomalies with process execution telemetry.`,
          confirmed_evidence: [
            `CONFIRMED: Target ${targetStr} linked to 48 SSH authentication failures (Event ALT-8902).`,
            `CONFIRMED: Process PID 4920 spawned with encoded arguments under local execution policy.`,
            `CONFIRMED: Threat intelligence match on external destination IP 185.220.101.5.`
          ],
          ai_generated_hypothesis: [
            `HYPOTHESIS: Initial access gained via credential brute force or valid account abuse on ${targetStr}.`,
            'HYPOTHESIS: Adversary attempting secondary payload download or lateral movement.'
          ],
          relevant_mitre_techniques: ['T1110 - Brute Force', 'T1059.001 - PowerShell', 'T1071.001 - C2'],
          risk_assessment: 'CRITICAL (Risk Score: 94/100). Active threat investigation.',
          riskScore: 94,
          recommended_remediation: [
            `Isolate host ${targetStr} from internal subnets immediately.`,
            'Dump process memory for PID 4920.',
            'Revoke compromised Kerberos tickets & enforce MFA.'
          ]
        });
      }

      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">AI Security Threat Analyst Assistant</h2>
            <p className="text-xs text-slate-400">Automated LLM security brief generator strictly separating empirical evidence from AI hypotheses.</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          AI ENGINE ACTIVE
        </span>
      </div>

      {/* Target Asset Input & Quick Preset Buttons */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={targetAsset}
            onChange={(e) => setTargetAsset(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateBrief()}
            placeholder="Enter Target Asset IP (e.g. 192.168.1.105) or Incident ID..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
          />
          <button
            onClick={() => handleGenerateBrief()}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Telemetry...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Investigation Brief</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-400">Quick Targets:</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_TARGETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setTargetAsset(preset.id);
                  handleGenerateBrief(preset.id);
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono border border-slate-700 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated AI Investigation Brief */}
      {brief && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">TARGET: {brief.target}</span>
              <StatusBadge level={brief.riskScore >= 75 ? 'CRITICAL' : 'HIGH'} />
            </div>
            <h3 className="text-sm font-bold font-mono text-white">Executive Summary</h3>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">{brief.executive_summary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confirmed Telemetry Evidence */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
              <h3 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Confirmed Empirical Telemetry Evidence
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-200">
                {brief.confirmed_evidence.map((ev, i) => (
                  <li key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Generated Hypotheses */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-3">
              <h3 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                AI-Generated Hypotheses & Attack Possibilities
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-200">
                {brief.ai_generated_hypothesis.map((hyp, i) => (
                  <li key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">?</span>
                    <span>{hyp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MITRE Mapping & Remediation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold font-mono text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Relevant MITRE ATT&CK Techniques
              </h3>
              <div className="flex flex-wrap gap-2">
                {brief.relevant_mitre_techniques.map((m) => (
                  <span key={m} className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold font-mono text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Recommended Remediation Roadmap
              </h3>
              <ul className="list-disc pl-5 text-xs font-mono text-slate-300 space-y-1.5">
                {brief.recommended_remediation.map((rem, i) => (
                  <li key={i}>{rem}</li>
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
