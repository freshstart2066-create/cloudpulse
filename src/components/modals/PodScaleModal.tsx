import React, { useState } from 'react';
import { Microservice } from '../../types/cloud';
import { useCloud } from '../../context/CloudContext';
import { X, Server, Cpu, HardDrive, Sliders, CheckCircle, RotateCw } from 'lucide-react';

interface PodScaleModalProps {
  service: Microservice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PodScaleModal: React.FC<PodScaleModalProps> = ({ service, isOpen, onClose }) => {
  const { restartMicroservice, showToast } = useCloud();
  const [replicas, setReplicas] = useState(service?.replicaCount || 6);

  if (!isOpen || !service) return null;

  const handleScale = () => {
    showToast(`🚀 Scaled ${service.name} to ${replicas} active pod replicas!`, 'success');
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#10121a] border border-[#232838] rounded-2xl p-6 text-white space-y-6 shadow-2xl animate-in zoom-in-95 font-mono text-xs"
      >
        <div className="flex items-center justify-between border-b border-[#232838] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-sans text-white">{service.name}</h3>
              <p className="text-[11px] text-zinc-400">Kubernetes Deployment & Container Specs</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#161924] p-3 rounded-xl border border-[#232838] space-y-1">
            <span className="text-zinc-400 text-[10px] block">Runtime & Protocol</span>
            <strong className="text-white text-xs">{service.type}</strong>
          </div>
          <div className="bg-[#161924] p-3 rounded-xl border border-[#232838] space-y-1">
            <span className="text-zinc-400 text-[10px] block">P99 SLA Target</span>
            <strong className="text-cyan-400 text-xs">{service.p99LatencyMs}ms (Healthy)</strong>
          </div>
        </div>

        {/* Replica Scaler Slider */}
        <div className="bg-[#161924] p-4 rounded-xl border border-[#232838] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-zinc-300 font-sans font-bold text-xs">Horizontal Pod Autoscaler (HPA)</span>
            <span className="text-sm font-black text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              {replicas} Pods
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="32"
            value={replicas}
            onChange={(e) => setReplicas(parseInt(e.target.value))}
            className="w-full h-2 bg-[#232838] rounded-lg accent-indigo-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-zinc-500">
            <span>Min: 1 Pod (Dev)</span>
            <span>Recommended: 8 Pods</span>
            <span>Max: 32 Pods (Surge)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-400 hover:text-white cursor-pointer font-sans font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleScale}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold font-sans transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
          >
            Apply Replica Scaling
          </button>
        </div>
      </div>
    </div>
  );
};
