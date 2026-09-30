import React from 'react';
import { 
  Activity, 
  Server, 
  ShieldCheck, 
  Flame, 
  Cpu, 
  Globe2, 
  Github, 
  RefreshCw,
  Bell
} from 'lucide-react';
import { useCloud } from '../../context/CloudContext';

export const Header: React.FC = () => {
  const { 
    activeCluster, 
    setActiveCluster, 
    incidents, 
    triggerChaosSpike,
    metrics 
  } = useCloud();

  const activeIncidents = incidents.filter(i => i.status !== 'resolved');

  return (
    <header className="h-16 bg-[#0c0e14] border-b border-[#232838] px-4 sm:px-8 flex items-center justify-between select-none z-30 relative">
      {/* Brand & Cluster Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight font-sans">CLOUDPULSE</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                ALL SYSTEMS NORMAL
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">
              Global Infrastructure & Serverless Telemetry (99.98% SLA)
            </p>
          </div>
        </div>

        {/* Cluster Selector */}
        <div className="hidden lg:flex items-center gap-2 bg-[#141824] border border-[#232838] px-3 py-1 rounded-md text-xs">
          <Server className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-zinc-400">Cluster:</span>
          <select
            value={activeCluster}
            onChange={(e) => setActiveCluster(e.target.value)}
            className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer"
          >
            <option value="production-us-east">k8s-prod-us-east-1</option>
            <option value="production-eu-west">k8s-prod-eu-central-1</option>
            <option value="edge-global-cdn">edge-worker-mesh-v8</option>
          </select>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Chaos Engineering Simulator Button */}
        <button
          type="button"
          onClick={triggerChaosSpike}
          className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow hover:scale-102"
          title="Simulate high traffic spike & incident to test auto-healing"
        >
          <Flame className="w-4 h-4 text-red-400 animate-bounce" />
          <span className="hidden sm:inline">Inject Chaos Spike</span>
        </button>

        {/* Active Incident Counter */}
        <div className="flex items-center gap-1.5 bg-[#141824] border border-[#232838] px-3 py-1.5 rounded-lg text-xs font-mono">
          <Bell className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-400">Incidents:</span>
          <span className={`font-bold ${activeIncidents.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {activeIncidents.length} active
          </span>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/freshstart2066-create/cloudpulse"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 hover:text-white transition-colors p-1"
          title="View GitHub Repository"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};
