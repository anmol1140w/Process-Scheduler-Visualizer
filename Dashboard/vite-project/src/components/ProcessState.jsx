import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VARIANTS } from "../utils/motion";

function ProcessState({ running, ready, completed }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Play size={16} className="text-indigo-600" /> Live execution status
        </h2>
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          ></motion.div>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">Active System</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {/* Running State */}
        <div className="p-6 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">CPU Running</h3>
          </div>
          <div className="min-h-[48px] flex items-center">
            <AnimatePresence mode="wait">
              {running ? (
                <motion.div 
                  key={running}
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -5 }}
                  className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-black text-xl shadow-[0_4px_12px_-4px_rgba(16,185,129,0.2)] border border-emerald-100"
                >
                  {running}
                </motion.div>
              ) : (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-300 font-medium italic text-sm"
                >
                  Processor Idle
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ready Queue */}
        <div className="p-6 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ready Queue</h3>
          </div>
          <div className="min-h-[48px] flex flex-wrap gap-1.5 items-center">
            <AnimatePresence>
              {ready.length > 0 ? (
                ready.map((pid) => (
                  <motion.span 
                    key={pid} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                    className="px-2.5 py-1 bg-amber-50/50 text-amber-700 border border-amber-100 rounded-md font-bold text-xs"
                  >
                    {pid}
                  </motion.span>
                ))
              ) : (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-300 font-medium italic text-sm"
                >
                  Queue Empty
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Completed State */}
        <div className="p-6 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Completed</h3>
          </div>
          <div className="min-h-[48px] flex flex-wrap gap-1.5 items-center">
            <AnimatePresence>
              {completed.length > 0 ? (
                completed.map((pid) => (
                  <motion.span 
                    key={pid} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                    className="px-2.5 py-1 bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-md font-bold text-xs"
                  >
                    {pid}
                  </motion.span>
                ))
              ) : (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-300 font-medium italic text-sm"
                >
                  None Finished
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessState;