import React, { useState } from 'react';
import { Activity, Sliders, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const RiskAnalysisPage = () => {
  const [alertSeverity, setAlertSeverity] = useState('HIGH');
  const [assetCriticality, setAssetCriticality] = useState(4);
  const [iocScore, setIocScore] = useState(70);
  const [mlScore, setMlScore] = useState(85);
  const [phishingScore, setPhishingScore] = useState(90);

  // Formula calculation
  const sevWeights = { LOW: 10, MEDIUM: 35, HIGH: 70, CRITICAL: 100 };
  const sevVal = sevWeights[alertSeverity] || 50;
  const assetVal = assetCriticality * 20;

  const calculatedRisk = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        sevVal * 0.35 + assetVal * 0.25 + iocScore * 0.2 + mlScore * 0.1 + phishingScore * 0.1
      )
    )
  );

  const getRiskLevel = (score) => {
    if (score >= 75) return 'CRITICAL';
    if (score >= 50) return 'HIGH';
    if (score >= 25) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Centralized Cyber Risk Engine & Simulator</h2>
            <p className="text-xs text-slate-400">Algorithmic risk evaluation matrix combining telemetry, asset importance, IOC reputation, and ML scores.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Simulator Sliders */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Interactive Telemetry Risk Simulator
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Alert Severity Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setAlertSeverity(s)}
                  className={`py-1.5 rounded text-xs font-mono font-bold transition-colors ${
                    alertSeverity === s
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Asset Criticality Rating (1-5)</span>
              <span className="text-cyan-400 font-bold">Level {assetCriticality}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={assetCriticality}
              onChange={(e) => setAssetCriticality(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>IOC Reputation Malicious Score</span>
              <span className="text-amber-400 font-bold">{iocScore}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={iocScore}
              onChange={(e) => setIocScore(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>ML Anomaly Detector Confidence</span>
              <span className="text-purple-400 font-bold">{mlScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={mlScore}
              onChange={(e) => setMlScore(Number(e.target.value))}
              className="w-full accent-purple-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>PhishGuard AI Phishing Risk Score</span>
              <span className="text-rose-400 font-bold">{phishingScore}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={phishingScore}
              onChange={(e) => setPhishingScore(Number(e.target.value))}
              className="w-full accent-rose-400"
            />
          </div>
        </div>

        {/* Calculated Output Matrix */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold font-mono text-white mb-4">Calculated Composite Cyber Risk</h3>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">OVERALL RISK SCORE</span>
              <p className="text-5xl font-bold font-mono text-rose-400 tracking-tight">{calculatedRisk}</p>
              <div className="pt-2">
                <StatusBadge level={getRiskLevel(calculatedRisk)} />
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs font-mono">
              <p className="text-slate-400 uppercase font-bold">Weighted Factors Breakdown:</p>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span>Alert Severity (35%):</span>
                  <span className="text-cyan-400 font-bold">{(sevVal * 0.35).toFixed(1)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Criticality (25%):</span>
                  <span className="text-cyan-400 font-bold">{(assetVal * 0.25).toFixed(1)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>IOC Malicious Score (20%):</span>
                  <span className="text-amber-400 font-bold">{(iocScore * 0.2).toFixed(1)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>ML Anomaly Score (10%):</span>
                  <span className="text-purple-400 font-bold">{(mlScore * 0.1).toFixed(1)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>PhishGuard AI Score (10%):</span>
                  <span className="text-rose-400 font-bold">{(phishingScore * 0.1).toFixed(1)} pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysisPage;
