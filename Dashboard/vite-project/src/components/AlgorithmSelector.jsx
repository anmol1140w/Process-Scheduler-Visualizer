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

  return (
    <div className="space-y-6">
      <div className="space-y-4 animate-in fade-in duration-500">
        <div>
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">
            Scheduling strategy
          </label>
          <select
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold text-slate-700 appearance-none cursor-pointer hover:bg-slate-100/50"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="fcfs">FCFS (Standard)</option>
            <option value="sjf">Shortest Job First</option>
            <option value="rr">Round Robin</option>
            <option value="priority_np">Priority (Non-Preemptive)</option>
            <option value="priority_p">Priority (Preemptive)</option>
          </select>
        </div>

        <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50 shadow-inner">
          <div className="flex items-center gap-2 mb-2 text-indigo-600">
            <Info size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">About this strategy</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
            {algorithms[algorithm].desc}
          </p>
        </div>
      </div>

      {algorithm === "rr" && (
        <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between px-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={13} className="text-amber-500" /> Time quantum
            </label>
            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-tighter">*Required</span>
          </div>
          <input
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700"
            type="number"
            min="1"
            value={quantum}
            onChange={(e) => setQuantum(e.target.value)}
            placeholder="e.g. 2"
          />
        </div>
      )}
    </div>
  );
}

export default AlgorithmSelector;