import React, { useState } from 'react';
import { useCloud } from '../../context/CloudContext';
import { Terminal, Search, Filter, Play, Pause, Download } from 'lucide-react';

export const LiveLogStream: React.FC = () => {
  const { logs } = useCloud();
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'ERROR' | 'WARN' | 'INFO'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const filteredLogs = logs.filter(l => {
    if (filterLevel !== 'ALL' && l.level !== filterLevel) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        l.path.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q) ||
        l.traceId.toLowerCase().includes(q) ||
        l.statusCode.toString().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#10121a] border border-[#232838] rounded-xl p-5 shadow-xl flex flex-col justify-between select-none">
      {/* Terminal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232838]/60 gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-white">Live Edge Invocations Stream</h3>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
            {isPaused ? 'PAUSED' : 'STREAMING'}
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <div className="flex bg-[#141824] p-0.5 rounded border border-[#232838] text-[11px] font-mono">
            {(['ALL', 'ERROR', 'WARN', 'INFO'] as const).map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilterLevel(lvl)}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  filterLevel === lvl ? 'bg-[#232838] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2 top-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search traces, status..."
              className="bg-[#141824] border border-[#232838] rounded pl-7 pr-2 py-1 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 w-36 sm:w-44 font-mono"
            />
          </div>

          {/* Pause / Resume */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 bg-[#141824] hover:bg-[#232838] border border-[#232838] rounded text-zinc-300 hover:text-white cursor-pointer"
            title={isPaused ? "Resume Live Stream" : "Pause Stream"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="bg-[#0c0e14] border border-[#1b1f2e] rounded-lg p-3 my-3 font-mono text-[11px] h-72 overflow-y-auto space-y-1.5 no-scrollbar">
        {filteredLogs.map(log => {
          const isError = log.level === 'ERROR';
          const isWarn = log.level === 'WARN';
          const isSuccess = log.level === 'SUCCESS';

          return (
            <div
              key={log.id}
              className="flex items-center gap-3 hover:bg-[#161924] p-1 rounded transition-colors"
            >
              <span className="text-zinc-500 text-[10px] shrink-0">{log.timeStr}</span>
              
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                isError 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : isWarn 
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {log.statusCode}
              </span>

              <span className="text-zinc-400 font-bold shrink-0">{log.method}</span>
              <span className="text-white font-medium truncate flex-1">{log.path}</span>
              <span className="text-zinc-500 text-[10px] shrink-0">{log.region}</span>
              <span className="text-cyan-400 text-[10px] shrink-0">{log.durationMs}ms</span>
              <span className="text-zinc-600 text-[10px] hidden md:inline shrink-0">{log.traceId}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
