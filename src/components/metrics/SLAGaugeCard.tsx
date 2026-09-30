import React from 'react';
import { ShieldCheck, Clock, Award, Activity } from 'lucide-react';

export const SLAGaugeCard: React.FC = () => {
  return (
    <div className="bg-[#10121a] border border-[#232838] rounded-xl p-4 sm:p-5 shadow-xl flex flex-col justify-between select-none font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#232838]/60">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-white font-sans">Reliability & SLA Compliance</h3>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
          TIER-1 ENTERPRISE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
        <div className="bg-[#141824] p-3 rounded-xl border border-[#232838]">
          <span className="text-zinc-500 text-[10px] block">30-Day Uptime SLA</span>
          <span className="text-lg font-black text-emerald-400">99.992%</span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Target: 99.95%</span>
        </div>

        <div className="bg-[#141824] p-3 rounded-xl border border-[#232838]">
          <span className="text-zinc-500 text-[10px] block">Mean Time to Resolve (MTTR)</span>
          <span className="text-lg font-black text-cyan-400">1.2 mins</span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Auto-healing active</span>
        </div>

        <div className="bg-[#141824] p-3 rounded-xl border border-[#232838]">
          <span className="text-zinc-500 text-[10px] block">Mean Time Between Failures</span>
          <span className="text-lg font-black text-indigo-400">184 hours</span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">High resiliency</span>
        </div>

        <div className="bg-[#141824] p-3 rounded-xl border border-[#232838]">
          <span className="text-zinc-500 text-[10px] block">Error Budget Remaining</span>
          <span className="text-lg font-black text-emerald-400">89.4%</span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Burn Rate: 0.04x</span>
        </div>
      </div>
    </div>
  );
};
