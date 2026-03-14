import { useState } from "react";
import { Plus, Trash2, ListChecks, Hash, Clock, Timer, Star } from "lucide-react";
import { toast } from "sonner";

function ProcessInput({ processes, setProcesses }) {
  const [process, setProcess] = useState({
    pid: "",
    arrival: "",
    burst: "",
    priority: "",
  });

  const handleChange = (e) => {
    setProcess({ ...process, [e.target.name]: e.target.value });
  };

  const addProcess = () => {
    if (!process.pid || !process.arrival || !process.burst) {
      toast.error("Please enter Process ID, Arrival Time, and Burst Time.");
      return;
    }
    
    // Check if duplicate PID
    if (processes.find(p => p.pid === process.pid)) {
      toast.error(`Process ID ${process.pid} already exists.`);
      return;
    }

    setProcesses((prev) => [...prev, process]);
    toast.success(`Process P${process.pid} added`);
    
    // Reset form
    setProcess({
      pid: "",
      arrival: "",
      burst: "",
      priority: "",
    });
  };

  const clearProcesses = () => {
    setProcesses([]);
  };

  return (
    <div className="space-y-6">
      {/* Selection Area */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
            <Hash size={12} /> PID
          </label>
          <input
            id="pid-input"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
            type="text"
            placeholder="e.g. 1"
            name="pid"
            value={process.pid}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
            <Clock size={12} /> Arrival
          </label>
          <input
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
            type="number"
            placeholder="0"
            name="arrival"
            value={process.arrival}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
            <Timer size={12} /> Burst
          </label>
          <input
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
            type="number"
            placeholder="1"
            name="burst"
            value={process.burst}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
            <Star size={12} /> Priority
          </label>
          <input
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
            type="number"
            placeholder="0"
            name="priority"
            value={process.priority}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          onClick={addProcess}
        >
          <Plus size={18} /> Add Entry
        </button>
        <button
          className="flex items-center justify-center bg-transparent hover:bg-rose-50 text-slate-400 hover:text-rose-600 px-4 py-3 rounded-xl transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={clearProcesses}
          disabled={processes.length === 0}
          title={processes.length === 0 ? "No processes to delete" : "Clear all processes"}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
          <ListChecks size={14} className="text-indigo-500" /> Current queue
        </label>
        
        <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-3 py-2.5 font-bold text-slate-500">PID</th>
                <th className="px-3 py-2.5 font-bold text-slate-500">Arr</th>
                <th className="px-3 py-2.5 font-bold text-slate-500">Bst</th>
                <th className="px-3 py-2.5 font-bold text-slate-500">Pri</th>
                <th className="px-3 py-2.5 font-bold text-slate-500 text-center">Act</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processes.length > 0 ? (
                processes.map((p, i) => (
                  <tr key={i} className="bg-white hover:bg-indigo-50/40 transition-colors group">
                    <td className="px-4 py-3.5 font-bold text-indigo-600">P{p.pid}</td>
                    <td className="px-4 py-3.5 text-slate-600 text-center font-medium">{p.arrival}</td>
                    <td className="px-4 py-3.5 text-slate-600 text-center font-medium">{p.burst}</td>
                    <td className="px-4 py-3.5 font-medium text-slate-400 text-right">{p.priority || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ListChecks size={24} className="text-slate-300 mb-1" />
                      <span className="font-medium text-slate-600">No processes added yet</span>
                      <button 
                        onClick={() => document.getElementById('pid-input')?.focus()}
                        className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline mt-1"
                      >
                        Add a process
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProcessInput;