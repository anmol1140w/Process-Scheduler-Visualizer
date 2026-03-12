import { GanttChart as GanttIcon, Info } from "lucide-react";

function GanttChart({ timeline = [] }) {
  const colors = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-violet-500",
  ];

  const getProcessColor = (pid) => {
    const num = parseInt(pid.replace("P", ""));
    const index = isNaN(num) ? 0 : num % colors.length;
    return colors[index];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GanttIcon className="text-indigo-600" size={20} />
          <h2 className="text-lg font-bold text-slate-800">Timeline Visualization</h2>
        </div>
        {timeline.length > 0 && (
          <div className="flex items-center gap-4 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Execution Flow</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative pt-2 pb-8 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {timeline.length > 0 ? (
          <div className="flex items-end gap-1 min-w-max pb-4">
            {timeline.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div
                  className={`relative flex items-center justify-center w-14 h-14 rounded-xl text-white font-black text-sm shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group-hover:brightness-110 ${getProcessColor(
                    p
                  )}`}
                >
                  {p}
                  {/* Decorative element */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/30"></div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  t={i}
                </div>
              </div>
            ))}
            {/* End marker */}
            <div className="flex flex-col items-center gap-2 self-end pb-0.5">
              <div className="w-0.5 h-14 bg-slate-200 rounded-full"></div>
              <div className="text-[10px] font-bold text-slate-400">t={timeline.length}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-3 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="p-4 bg-white rounded-full shadow-sm text-slate-300">
              <GanttIcon size={40} strokeWidth={1} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">No Execution Data</h3>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-relaxed">
                Add processes and run the simulation to see the Gantt chart timeline.
              </p>
            </div>
          </div>
        )}
      </div>

      {timeline.length > 0 && (
        <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-2 border border-slate-100">
          <Info size={14} className="text-slate-400 mt-0.5" />
          <p className="text-[10px] leading-relaxed text-slate-500 font-medium italic">
            Each block represents 1 time unit of CPU execution. Hover over blocks to highlight specific process segments.
          </p>
        </div>
      )}
    </div>
  );
}

export default GanttChart;