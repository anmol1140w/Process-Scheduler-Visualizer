import { useState } from "react";
import { GanttChart as GanttIcon, Info, Clock, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VARIANTS } from "../utils/motion";

function GanttChart({ timeline = [], onLoadSample, onRunDemo }) {
  const [hoveredPid, setHoveredPid] = useState(null);
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
          <motion.div 
            className="flex items-end gap-1.5 min-w-max pb-4 px-1"
            variants={VARIANTS.timelineContainer}
            initial="hidden"
            animate="show"
          >
            {timeline.map((p, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center gap-2 group relative"
                variants={VARIANTS.timelineBlock}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                  <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap flex items-center gap-1.5">
                    <Fingerprint size={10} /> {p} | <Clock size={10} /> t={i}
                  </div>
                  <div className="w-1.5 h-1.5 bg-slate-800 rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2"></div>
                </div>

                <motion.div
                  onMouseEnter={() => setHoveredPid(p)}
                  onMouseLeave={() => setHoveredPid(null)}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className={`relative flex items-center justify-center w-14 h-14 rounded-xl text-white font-black text-sm shadow-sm transition-all duration-300 cursor-help group-hover:shadow-lg ${getProcessColor(
                    p
                  )} ${hoveredPid && hoveredPid !== p ? "opacity-30 scale-95 grayscale-[0.2]" : "opacity-100 scale-100"}`}
                >
                  {p}
                  {/* Glassmorphism highlight */}
                  <AnimatePresence>
                    {hoveredPid === p && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-xl ring-2 ring-indigo-400 ring-offset-2 ring-offset-white z-10 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white/40"></div>
                </motion.div>
                
                <div className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  {i}
                </div>
              </motion.div>
            ))}
            {/* End marker */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-2 self-end pb-0.5 ml-2"
            >
              <div className="w-0.5 h-14 bg-slate-200 rounded-full"></div>
              <div className="text-[10px] font-bold text-slate-400">{timeline.length}</div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-5 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="p-4 bg-white rounded-full shadow-sm text-slate-300">
              <GanttIcon size={40} strokeWidth={1} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800">No Execution Data</h3>
              <p className="text-xs text-slate-500 max-w-[250px] mx-auto leading-relaxed">
                Add processes and run the simulation to see the Gantt chart timeline.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onLoadSample}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                Add sample processes
              </button>
              <button
                onClick={onRunDemo}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                Run demo
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 mt-2">
              <span>Add processes</span>
              <span>→</span>
              <span>Select algorithm</span>
              <span>→</span>
              <span>Run simulation</span>
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