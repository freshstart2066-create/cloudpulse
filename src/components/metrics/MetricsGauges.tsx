import React from 'react';
import { useCloud } from '../../context/CloudContext';
import { Cpu, HardDrive, Wifi, Zap, Activity } from 'lucide-react';

export const MetricsGauges: React.FC = () => {
  const { metrics, metricsHistory } = useCloud();

  // Helper to render mini SVG sparkline
  const renderSparkline = (dataKey: 'cpu' | 'memory' | 'network' | 'iops', color: string) => {
    const points = metricsHistory.map(m => m[dataKey]);
    const min = Math.min(...points);
    const max = Math.max(...points) || 1;
    const range = max - min || 1;
    const w = 120;
    const h = 30;

    const path = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * w;
      const y = h - ((val - min) / range) * (h - 4) - 2;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
      <svg width={w} height={h} className="overflow-visible">
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-[#08090d]">
      {/* 1. CPU Load */}
      <div className="bg-[#10121a] border border-[#232838] rounded-xl p-4 shadow-lg flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-zinc-300">Cluster CPU Load</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">128 vCPUs</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className={`text-2xl font-black font-mono ${metrics.cpu > 80 ? 'text-red-400' : 'text-white'}`}>
              {metrics.cpu}%
            </span>
            <span className="text-[11px] text-zinc-400 block">Avg Core Temp 41°C</span>
          </div>
          {renderSparkline('cpu', '#6366f1')}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#1b1f2e] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${metrics.cpu > 80 ? 'bg-red-500' : 'bg-indigo-500'}`}
            style={{ width: `${Math.min(100, metrics.cpu)}%` }}
          />
        </div>
      </div>

      {/* 2. Memory Utilization */}
      <div className="bg-[#10121a] border border-[#232838] rounded-xl p-4 shadow-lg flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <HardDrive className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-zinc-300">RAM Allocation</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">512 GB Pool</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-black font-mono text-white">
              {metrics.memory}%
            </span>
            <span className="text-[11px] text-zinc-400 block">{((metrics.memory / 100) * 512).toFixed(1)} GB in Use</span>
          </div>
          {renderSparkline('memory', '#06b6d4')}
        </div>

        <div className="w-full h-1.5 bg-[#1b1f2e] rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${Math.min(100, metrics.memory)}%` }}
          />
        </div>
      </div>

      {/* 3. Network Throughput */}
      <div className="bg-[#10121a] border border-[#232838] rounded-xl p-4 shadow-lg flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Wifi className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-zinc-300">Network Bandwidth</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">10 Gbps Link</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-black font-mono text-white">
              {metrics.network} <span className="text-xs font-semibold text-zinc-400">MB/s</span>
            </span>
            <span className="text-[11px] text-zinc-400 block">Ingress + Egress</span>
          </div>
          {renderSparkline('network', '#10b981')}
        </div>

        <div className="w-full h-1.5 bg-[#1b1f2e] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${Math.min(100, (metrics.network / 2500) * 100)}%` }}
          />
        </div>
      </div>

      {/* 4. Serverless Invocations */}
      <div className="bg-[#10121a] border border-[#232838] rounded-xl p-4 shadow-lg flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-zinc-300">Serverless Invocations</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Real-time</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-black font-mono text-white">
              {(metrics.serverlessReqs / 1000).toFixed(1)}k <span className="text-xs font-semibold text-zinc-400">/min</span>
            </span>
            <span className="text-[11px] text-zinc-400 block">IOPS: {metrics.iops.toLocaleString()}</span>
          </div>
          {renderSparkline('iops', '#f59e0b')}
        </div>

        <div className="w-full h-1.5 bg-[#1b1f2e] rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${Math.min(100, (metrics.serverlessReqs / 100000) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
