import { useState } from "react";
import { Plus, Trash2, ListChecks, Hash, Clock, Timer, Star } from "lucide-react";

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
      alert("Please enter Process ID, Arrival Time, and Burst Time.");
      return;
    }
    setProcesses((prev) => [...prev, process]);
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5 col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Hash size={14} /> Process ID
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            placeholder="e.g. 1"
            name="pid"
            type="number"
            value={process.pid}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={14} /> Arrival
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            placeholder="0"
            name="arrival"
            type="number"
            value={process.arrival}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Timer size={14} /> Burst
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            placeholder="5"
            name="burst"
            type="number"
            value={process.burst}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1.5 col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Star size={14} /> Priority (Optional)
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            placeholder="1 (Highest)"
            name="priority"
            type="number"
            value={process.priority}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm shadow-sm shadow-slate-200"
          onClick={addProcess}
        >
          <Plus size={18} /> Add Entry
        </button>
        <button
          className="flex items-center justify-center bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 text-slate-500 p-2.5 rounded-lg transition-all"
          onClick={clearProcesses}
          title="Clear all processes"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <ListChecks size={16} className="text-indigo-600" /> Current Queue
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-wider">
            {processes.length} Processes
          </span>
        </div>
        
        <div className="max-h-56 overflow-y-auto rounded-lg border border-slate-100 shadow-inner bg-slate-50/50">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="sticky top-0 bg-white border-b border-slate-200 z-10 shadow-sm">
              <tr>
                <th className="px-3 py-2.5 font-bold text-slate-400 uppercase tracking-widest">PID</th>
                <th className="px-3 py-2.5 font-bold text-slate-400 uppercase tracking-widest text-center">AT</th>
                <th className="px-3 py-2.5 font-bold text-slate-400 uppercase tracking-widest text-center">BT</th>
                <th className="px-3 py-2.5 font-bold text-slate-400 uppercase tracking-widest text-right">Pri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processes.length > 0 ? (
                processes.map((p, i) => (
                  <tr key={i} className="bg-white/50 hover:bg-indigo-50/50 transition-colors group">
                    <td className="px-3 py-2.5 font-bold text-indigo-600">P{p.pid}</td>
                    <td className="px-3 py-2.5 text-slate-600 text-center">{p.arrival}</td>
                    <td className="px-3 py-2.5 text-slate-600 text-center">{p.burst}</td>
                    <td className="px-3 py-2.5 font-medium text-slate-400 text-right">{p.priority || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-3 py-8 text-center text-slate-400 italic">
                    Queue is currently empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProcessInput;