import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const SOCLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      {/* Navigation Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <Navbar onMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Global Footer */}
        <footer className="px-6 py-3 border-t border-slate-800/80 bg-slate-950/60 text-center text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>CyberSentinel Security Operations Platform v1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-400">● Auth: Firebase</span>
            <span className="text-cyan-400">● DB: Firestore</span>
            <span className="text-purple-400">● AI/ML: Active</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SOCLayout;
