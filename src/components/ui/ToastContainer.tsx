import React from 'react';
import { useCloud } from '../../context/CloudContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useCloud();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none select-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isDanger = toast.type === 'danger';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200 ${
              isSuccess
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : isDanger
                ? 'bg-red-500/15 border-red-500/40 text-red-400'
                : isWarning
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-[#161924]/95 border-[#232838] text-white'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            {isDanger && <AlertCircle className="w-5 h-5 shrink-0 animate-bounce" />}
            {isWarning && <AlertTriangle className="w-5 h-5 shrink-0" />}
            {!isSuccess && !isDanger && !isWarning && <Info className="w-5 h-5 shrink-0 text-indigo-400" />}

            <p className="text-xs font-mono font-medium leading-snug flex-1">
              {toast.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};
