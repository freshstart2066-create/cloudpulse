import React from 'react';
import { useCloud } from '../../context/CloudContext';
import { Globe, MapPin, Radio, Wifi } from 'lucide-react';

export const GlobalEdgeMap: React.FC = () => {
  const { regions } = useCloud();

  return (
    <div className="bg-[#10121a] border border-[#232838] rounded-xl p-5 shadow-xl flex flex-col justify-between select-none">
      {/* Map Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#232838]/60">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white">Global Edge Node Mesh</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>6/6 Edge PoPs Active</span>
          </span>
        </div>
      </div>

      {/* Stylized World Map Schematic Grid */}
      <div className="relative w-full aspect-[2/1] bg-[#0c0e14] rounded-lg my-4 overflow-hidden border border-[#1b1f2e] flex items-center justify-center">
        {/* World Grid Lines Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#232838_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

        {/* Dynamic Edge Node Pins */}
        {regions.map(reg => {
          const isDegraded = reg.status === 'degraded';
          return (
            <div
              key={reg.id}
              style={{ left: `${reg.xPercent}%`, top: `${reg.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            >
              {/* Ping Wave */}
              <div
                className={`absolute inset-0 w-8 h-8 -left-2 -top-2 rounded-full opacity-75 animate-ping ${
                  isDegraded ? 'bg-amber-500' : 'bg-cyan-500'
                }`}
              />

              {/* Node Center Dot */}
              <div
                className={`relative w-4 h-4 rounded-full border-2 border-[#0c0e14] shadow-lg flex items-center justify-center ${
                  isDegraded ? 'bg-amber-400' : 'bg-cyan-400'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Hover Node Tooltip */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-[#161924] border border-[#232838] rounded-lg p-2.5 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30 text-xs font-mono">
                <div className="flex items-center justify-between pb-1 border-b border-[#232838]/60 mb-1">
                  <span className="font-bold text-white font-sans">{reg.name}</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1 rounded">{reg.code}</span>
                </div>
                <div className="space-y-0.5 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Ping Latency:</span>
                    <strong className={isDegraded ? 'text-amber-400' : 'text-emerald-400'}>{reg.latencyMs}ms</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Throughput:</span>
                    <strong className="text-white">{(reg.requestsPerSec / 1000).toFixed(1)}k req/s</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Region Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
        {regions.map(r => (
          <div key={r.id} className="bg-[#141824] p-2.5 rounded-lg border border-[#232838] text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{r.code}</span>
              <span className={`w-2 h-2 rounded-full ${r.status === 'operational' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            </div>
            <span className="text-[10px] text-zinc-400 block truncate">{r.location}</span>
            <span className="text-cyan-400 font-bold mt-1 block">{r.latencyMs} ms</span>
          </div>
        ))}
      </div>
    </div>
  );
};
