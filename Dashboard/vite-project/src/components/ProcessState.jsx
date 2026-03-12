import { Play, List, CheckCircle2 } from "lucide-react";

function ProcessState({ running, ready, completed }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Play size={16} className="text-indigo-600" /> Live Execution Status
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active System</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {/* Running State */}
        <div className="p-6 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-2 text-emerald-600">
            <Play size={16} fill="currentColor" />
            <h3 className="text-xs font-black uppercase tracking-widest">CPU Running</h3>
          </div>
          <div className="min-h-[48px] flex items-center">
            {running ? (
              <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-black text-xl shadow-sm border border-emerald-200 animate-in zoom-in duration-300">
                {running}
              </div>
            ) : (
              <span className="text-slate-300 font-medium italic text-sm">Processor Idle</span>
            )}
          </div>
        </div>

        {/* Ready Queue */}
        <div className="p-6 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-2 text-amber-500">
            <List size={16} strokeWidth={3} />
            <h3 className="text-xs font-black uppercase tracking-widest">Ready Queue</h3>
          </div>
          <div className="min-h-[48px] flex flex-wrap gap-1.5 items-center">
            {ready.length > 0 ? (
              ready.map((pid, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-md font-bold text-xs">
                  {pid}
                </span>
              ))
            ) : (
              <span className="text-slate-300 font-medium italic text-sm">Queue Empty</span>
            )}
          </div>
        </div>

        {/* Completed State */}
        <div className="p-6 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-2 text-indigo-500">
            <CheckCircle2 size={16} />
            <h3 className="text-xs font-black uppercase tracking-widest">Completed</h3>
          </div>
          <div className="min-h-[48px] flex flex-wrap gap-1.5 items-center">
            {completed.length > 0 ? (
              completed.map((pid, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md font-bold text-xs">
                  {pid}
                </span>
              ))
            ) : (
              <span className="text-slate-300 font-medium italic text-sm">None Finished</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessState;