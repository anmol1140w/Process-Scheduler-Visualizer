import React from "react";
import { BookOpen, Cpu, Clock, BarChart3, HelpCircle } from "lucide-react";

function InfoSection() {
  return (
    <div className="space-y-12 py-8">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-indigo-600" size={32} />
          <h2 className="text-3xl font-bold text-slate-800">Documentation</h2>
        </div>
        <p className="text-slate-600 text-lg leading-relaxed">
          Welcome to <span className="font-bold text-slate-800">SchedulerPro Visualizer</span>. This tool is designed to help students and developers understand how different Operating System scheduling algorithms manage process execution.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Cpu className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Process Management</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Each process is defined by its Arrival Time (when it enters the ready queue), Burst Time (total CPU time required), and Priority (importance level).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Clock className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Time Quantum</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            In Round Robin scheduling, the time quantum is the small unit of time each process gets to run before being preempted by the next process in line.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="text-amber-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Key Metrics</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            <strong>Waiting Time:</strong> Total time spent in the ready queue.<br />
            <strong>Turnaround Time:</strong> Total time from arrival to completion.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <HelpCircle className="text-emerald-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">How to Use</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            1. Add processes with unique IDs.<br />
            2. Select a scheduling algorithm.<br />
            3. Adjust quantum if using Round Robin.<br />
            4. Click "Run Simulation" to visualize the execution.
          </p>
        </div>
      </div>

      <section className="bg-slate-800 rounded-3xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4 italic">Pro Tip</h3>
        <p className="text-slate-300 leading-relaxed">
          Compare <strong>Shortest Job First (SJF)</strong> with <strong>FCFS</strong> to see how SJF minimizes average waiting time but can lead to process starvation for longer tasks.
        </p>
      </section>
    </div>
  );
}

export default InfoSection;
