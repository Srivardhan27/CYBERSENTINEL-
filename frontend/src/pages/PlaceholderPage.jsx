import React from 'react';
import { Shield, Sparkles, Clock } from 'lucide-react';

const PlaceholderPage = ({ title, moduleName, phaseNumber, description, icon: Icon }) => {
  return (
    <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Icon className="w-6 h-6" />
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Shield className="w-6 h-6" />
          </div>
        )}
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            CYBERSENTINEL MODULE: {moduleName || 'CORE'}
          </span>
          <h2 className="text-2xl font-bold font-mono text-white mt-1">{title}</h2>
        </div>
      </div>

      <p className="text-sm text-slate-300 max-w-2xl">{description}</p>

      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Foundation Ready (Scheduled for Phase {phaseNumber})</span>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/30">
          STATUS: READY FOR INTEGRATION
        </span>
      </div>
    </div>
  );
};

export default PlaceholderPage;
