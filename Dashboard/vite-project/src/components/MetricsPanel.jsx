import { BarChart3, TrendingUp, Clock, ArrowRight, Info } from "lucide-react";

function MetricsPanel({ metrics }) {
  if (metrics.length === 0) {
    return null;
  }

  const avgWait = (metrics.reduce((acc, m) => acc + m.waiting, 0) / metrics.length).toFixed(2);
  const avgTurn = (metrics.reduce((acc, m) => acc + m.turnaround, 0) / metrics.length).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <BarChart3 size={16} className="text-indigo-600" /> Performance Analytics
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Avg Wait: {avgWait}ms
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Avg Turn: {avgTurn}ms
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Process Reference</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Waiting Duration</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Turnaround Time</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Efficiency Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {metrics.map((m, i) => {
              // Simple efficiency score calculation for visual flair
              const efficiency = Math.max(10, 100 - (m.waiting * 2)).toFixed(0);
              
              return (
                <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        P{m.pid}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Process {m.pid}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100">
                      <Clock size={12} /> {m.waiting}ms
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">
                      <TrendingUp size={12} /> {m.turnaround}ms
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden hidden sm:block">
                        <div 
                          className={`h-full rounded-full ${efficiency > 70 ? 'bg-emerald-500' : efficiency > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-black text-slate-400">{efficiency}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Info size={12} /> Computed using standard OS scheduling metrics
        </p>
        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
          Export Data <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

export default MetricsPanel;