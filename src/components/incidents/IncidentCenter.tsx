import React from 'react';
import { useCloud } from '../../context/CloudContext';
import { AlertTriangle, CheckCircle2, ShieldAlert, Zap, ArrowRight } from 'lucide-react';

export const IncidentCenter: React.FC = () => {
  const { incidents, remediateIncident } = useCloud();

  return (
    <div className="bg-[#10121a] border border-[#232838] rounded-xl p-5 shadow-xl flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#232838]/60">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm text-white">Incident Triage & Auto-Remediation</h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Self-Healing Enabled
        </span>
      </div>

      {/* Incidents Cards List */}
      <div className="space-y-3 my-3">
        {incidents.map(inc => {
          const isResolved = inc.status === 'resolved';
          const isCritical = inc.severity === 'critical';

          return (
            <div
              key={inc.id}
              className={`p-4 rounded-xl border transition-all ${
                isResolved
                  ? 'bg-[#141824]/40 border-[#232838]/40 opacity-70'
                  : isCritical
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-amber-500/10 border-amber-500/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                    isCritical ? 'bg-red-500 text-white' : 'bg-amber-500 text-black'
                  }`}>
                    {inc.severity}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-white">{inc.title}</h4>
                </div>

                <span className="text-[11px] text-zinc-400 font-mono">{inc.triggeredAt}</span>
              </div>

              <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                {inc.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#232838]/40">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                  <span>Service: <strong className="text-white">{inc.service}</strong></span>
                  <span>•</span>
                  <span>Region: <strong className="text-cyan-400">{inc.region}</strong></span>
                </div>

                {isResolved ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Remediated & Healed</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => remediateIncident(inc.id)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-sans shadow-lg shadow-indigo-500/20 transition-all cursor-pointer hover:scale-102"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Auto-Remediate (1-Click)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
