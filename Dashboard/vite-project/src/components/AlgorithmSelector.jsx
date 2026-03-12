import { useState } from "react";
import { ChevronDown, Info, Zap } from "lucide-react";

function AlgorithmSelector({ algorithm, setAlgorithm, quantum, setQuantum }) {
  const algorithms = {
    fcfs: {
      name: "First Come, First Served",
      desc: "Processes are executed in the order they arrive. Simple but can cause 'convoy effect'.",
    },
    sjf: {
      name: "Shortest Job First",
      desc: "Executes the process with the smallest burst time next. Minimizes average wait time.",
    },
    rr: {
      name: "Round Robin",
      desc: "Each process gets a small fixed unit of CPU time (quantum) in a circular queue.",
    },
    priority_np: {
      name: "Priority (Non-Preemptive)",
      desc: "CPU is allocated to the process with the highest priority. No interruption once started.",
    },
    priority_p: {
      name: "Priority (Preemptive)",
      desc: "If a new process arrives with higher priority than the current, the current is preempted.",
    },
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div className="space-y-5">
      <div className="relative group">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
          Select Strategy
        </label>
        <div className="relative">
          <select
            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold text-slate-700 cursor-pointer"
            value={algorithm}
            onChange={handleAlgorithmChange}
          >
            <option value="fcfs">FCFS (Standard)</option>
            <option value="sjf">Shortest Job First</option>
            <option value="rr">Round Robin</option>
            <option value="priority_np">Priority (Non-Preemptive)</option>
            <option value="priority_p">Priority (Preemptive)</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 flex gap-3">
        <div className="mt-0.5 text-indigo-500">
          <Info size={16} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-indigo-900 mb-1">
            {algorithms[algorithm].name}
          </h4>
          <p className="text-[11px] leading-relaxed text-indigo-700/80 italic font-medium">
            {algorithms[algorithm].desc}
          </p>
        </div>
      </div>

      {algorithm === "rr" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={14} className="text-amber-500" /> Time Quantum
            </label>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Required</span>
          </div>
          <input
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700"
            type="number"
            min="1"
            value={quantum}
            onChange={(e) => setQuantum(e.target.value)}
            placeholder="Enter quantum (e.g. 2)"
          />
        </div>
      )}
    </div>
  );
}

export default AlgorithmSelector;