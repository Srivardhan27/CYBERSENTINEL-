import React from 'react';

const StatusBadge = ({ level, className = '' }) => {
  const normalizedLevel = (level || '').toUpperCase();

  const getStyle = () => {
    switch (normalizedLevel) {
      case 'CRITICAL':
      case 'SEVERE':
        return 'bg-rose-950/80 text-rose-400 border-rose-500/40 glow-red';
      case 'HIGH':
      case 'ELEVATED':
        return 'bg-amber-950/80 text-amber-400 border-amber-500/40 glow-amber';
      case 'MEDIUM':
      case 'GUARDED':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40 glow-cyan';
      case 'LOW':
      case 'CLEAN':
      case 'NORMAL':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 glow-green';
      case 'NEW':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'INVESTIGATING':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'CONTAINED':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'RESOLVED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-semibold rounded border uppercase tracking-wider ${getStyle()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {level}
    </span>
  );
};

export default StatusBadge;
