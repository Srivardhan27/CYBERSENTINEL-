import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'cyan', subtitle, trend, highlight = false }) => {
  const colorStyles = {
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20 hover:border-cyan-500/60',
    red: 'border-rose-500/30 text-rose-400 bg-rose-950/20 hover:border-rose-500/60',
    amber: 'border-amber-500/30 text-amber-400 bg-amber-950/20 hover:border-amber-500/60',
    green: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20 hover:border-emerald-500/60',
    purple: 'border-purple-500/30 text-purple-400 bg-purple-950/20 hover:border-purple-500/60',
  };

  return (
    <div
      className={`relative p-5 rounded-xl bg-slate-900/80 border backdrop-blur transition-all duration-200 group ${
        colorStyles[color] || colorStyles.cyan
      } ${highlight ? 'ring-1 ring-cyan-500/50' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold font-mono text-white tracking-tight">
          {value}
        </span>
        {trend && (
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 truncate">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
