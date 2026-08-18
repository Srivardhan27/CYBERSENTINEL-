import React, { useState } from 'react';
import { Network, Activity, Radio, ShieldAlert, Cpu } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const MOCK_PACKETS = [
  { time: '12:45:10', src: '192.168.1.105', dst: '10.0.0.12', proto: 'SSH (22)', len: 142, status: 'DENIED', alert: 'Brute Force Indicator' },
  { time: '12:44:59', src: '10.0.0.45', dst: '8.8.8.8', proto: 'DNS (53)', len: 64, status: 'PASSED', alert: 'None' },
  { time: '12:43:20', src: '10.0.2.14', dst: '10.0.2.0/24', proto: 'TCP SYN (445)', len: 54, status: 'FLAGGED', alert: 'Internal Port Scan' },
  { time: '12:41:05', src: '10.0.3.45', dst: '45.33.32.156', proto: 'TLS (443)', len: 512, status: 'PASSED', alert: 'Low Rep Destination' },
  { time: '12:39:18', src: '185.220.101.5', dst: '10.0.0.12', proto: 'HTTP (80)', len: 1280, status: 'BLOCKED', alert: 'Malicious IOC Hit' },
];

const NetworkMonitorPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Defensive Network Security Telemetry Monitor</h2>
            <p className="text-xs text-slate-400">Live packet inspection telemetry (PyShark / Scapy engine) monitoring local lab subnets.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded text-xs font-mono font-bold">
          <Activity className="w-4 h-4 animate-pulse" />
          PACKET CAPTURE: RUNNING
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Current Bandwidth Ingress</span>
          <p className="text-xl font-bold font-mono text-cyan-400 mt-1">42.8 Mbps</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Packets Analyzed / Sec</span>
          <p className="text-xl font-bold font-mono text-emerald-400 mt-1">1,420 pps</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Flagged Protocol Anomalies</span>
          <p className="text-xl font-bold font-mono text-rose-400 mt-1">7 Detections</p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <h3 className="text-sm font-bold font-mono text-white mb-3">Live Packet Telemetry Stream</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Source IP</th>
                <th className="py-2.5 px-3">Destination IP</th>
                <th className="py-2.5 px-3">Protocol / Port</th>
                <th className="py-2.5 px-3">Packet Length</th>
                <th className="py-2.5 px-3">Firewall Action</th>
                <th className="py-2.5 px-3">Defensive Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {MOCK_PACKETS.map((pkt, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 text-slate-400">{pkt.time}</td>
                  <td className="py-2.5 px-3 text-cyan-400 font-bold">{pkt.src}</td>
                  <td className="py-2.5 px-3 text-slate-200">{pkt.dst}</td>
                  <td className="py-2.5 px-3 text-slate-300">{pkt.proto}</td>
                  <td className="py-2.5 px-3 text-slate-400">{pkt.len} bytes</td>
                  <td className="py-2.5 px-3">
                    <StatusBadge level={pkt.status} />
                  </td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">{pkt.alert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NetworkMonitorPage;
