import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../firebase/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, switchDemoAccount, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials or authentication error.');
    }
  };

  const handleDemoClick = (role) => {
    switchDemoAccount(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 glow-cyan mb-2">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-mono text-white uppercase tracking-wider">
            CyberSentinel
          </h1>
          <p className="text-xs font-mono text-cyan-400">
            AI Cloud SOC & Threat Intelligence Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            SOC Analyst Authentication
          </h2>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@sentinel.sec"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to SOC Platform'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick One-Click Demo Role Switcher */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <p className="text-[11px] font-mono text-slate-400 text-center uppercase tracking-wider">
              One-Click Demo Account Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoClick(USER_ROLES.ADMIN)}
                className="py-1.5 px-2 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-[10px] font-bold hover:bg-rose-900/40 transition-colors"
              >
                ADMIN
              </button>
              <button
                onClick={() => handleDemoClick(USER_ROLES.SECURITY_ANALYST)}
                className="py-1.5 px-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold hover:bg-cyan-900/40 transition-colors"
              >
                ANALYST
              </button>
              <button
                onClick={() => handleDemoClick(USER_ROLES.VIEWER)}
                className="py-1.5 px-2 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px] font-bold hover:bg-slate-700 transition-colors"
              >
                VIEWER
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-slate-500">
          <span>Authorized Lab & Defensive Operations Only</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
