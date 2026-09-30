import React from 'react';
import { useCloud } from '../../context/CloudContext';
import { Server, RotateCcw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const ServiceHealthGrid: React.FC = () => {
  const { microservices, restartMicroservice } = useCloud();

  return (
    <div className="bg-[#10121a] border border-[#232838] rounded-xl p-5 shadow-xl flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#232838]/60">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Microservice Mesh & Pod Replicas</h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          5 Core Services
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto my-3">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="text-[10px] text-zinc-500 border-b border-[#232838]/60 pb-2">
              <th className="p-2 font-sans font-semibold">Service Name</th>
              <th className="p-2 font-sans font-semibold">Runtime</th>
              <th className="p-2 font-sans font-semibold">Uptime</th>
              <th className="p-2 font-sans font-semibold">P99 Latency</th>
              <th className="p-2 font-sans font-semibold">Replicas</th>
              <th className="p-2 font-sans font-semibold">Status</th>
              <th className="p-2 text-right font-sans font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#232838]/30">
            {microservices.map(svc => {
              const isRestarting = svc.status === 'restarting';
              const isDegraded = svc.status === 'degraded';

              return (
                <tr key={svc.id} className="hover:bg-[#161924] transition-colors">
                  <td className="p-2 font-bold text-white font-sans">{svc.name}</td>
                  <td className="p-2 text-zinc-400">{svc.type}</td>
                  <td className="p-2 text-emerald-400">{svc.uptimePercent}%</td>
                  <td className="p-2 text-cyan-400">{svc.p99LatencyMs}ms</td>
                  <td className="p-2 text-zinc-300">{svc.replicaCount} pods</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isRestarting
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : isDegraded
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {svc.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-2 text-right">
                    <button
                      type="button"
                      disabled={isRestarting}
                      onClick={() => restartMicroservice(svc.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1b1f2e] hover:bg-indigo-600 disabled:opacity-50 text-zinc-300 hover:text-white rounded text-[10px] font-bold font-sans transition-colors cursor-pointer"
                    >
                      <RotateCcw className={`w-3 h-3 ${isRestarting ? 'animate-spin' : ''}`} />
                      <span>{isRestarting ? 'Restarting...' : 'Rolling Restart'}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
