import { useState } from "react";
import { Layout, Play, RotateCcw, Activity, Settings, List, Info, Database } from "lucide-react";
import GanttChart from "./components/GanttChart";
import ProcessInput from "./components/ProcessInput";
import AlgorithmSelector from "./components/AlgorithmSelector";
import MetricsPanel from "./components/MetricsPanel";
import ProcessState from "./components/ProcessState";
import InfoSection from "./components/InfoSection";
import { runScheduler } from "./services/schedulerApi";

function App() {
  const [timeline, setTimeline] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("fcfs");
  const [quantum, setQuantum] = useState(0);
  const [metrics, setMetrics] = useState([]);
  const [running, setRunning] = useState("");
  const [ready, setReady] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const runSimulation = async () => {
    if (!processes || processes.length === 0) {
      alert("Please add at least one process to start the simulation.");
      return;
    }

    const request = {
      algorithm,
      quantum: parseInt(quantum) || 0,
      processes: processes.map((p) => ({
        pid: parseInt(p.pid),
        arrival: parseInt(p.arrival),
        burst: parseInt(p.burst),
        priority: parseInt(p.priority) || 0,
      })),
    };

    try {
      const result = await runScheduler(request);

      if (!result || !result.timeline || result.timeline.length === 0) {
        alert("No simulation data was generated. Please check your inputs.");
        return;
      }

      const data = result.timeline;
      let i = 0;

      setTimeline([]);
      setCompleted([]);
      setMetrics([]);

      const interval = setInterval(() => {
        if (i >= data.length) {
          clearInterval(interval);
          setRunning("");
          if (result.metrics) {
            setCompleted(result.metrics.map((m) => "P" + parseInt(m.pid)));
            setMetrics(result.metrics);
          }
          return;
        }

        const current = data[i];
        setTimeline((prev) => [...prev, "P" + parseInt(current.pid)]);
        setRunning("P" + parseInt(current.pid));
        i++;
      }, 800);
    } catch (error) {
      console.error("Simulation error:", error);
      alert("Simulation engine error: " + error.message);
    }
  };

  const resetSimulation = () => {
    setTimeline([]);
    setMetrics([]);
    setRunning("");
    setCompleted([]);
    setProcesses([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            Scheduler<span className="text-indigo-600">Pro</span> Visualizer
          </h1>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 transition-colors hover:text-indigo-600 ${activeTab === "dashboard" ? "text-indigo-600 border-b-2 border-indigo-600 pb-1" : ""}`}
          >
            <Layout size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-2 transition-colors hover:text-indigo-600 ${activeTab === "info" ? "text-indigo-600 border-b-2 border-indigo-600 pb-1" : ""}`}
          >
            <Info size={18} /> Documentation
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {activeTab === "dashboard" ? (
          <div className="flex-1 overflow-auto p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Control Panel Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Column: Inputs */}
              <div className="xl:col-span-4 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Database size={18} className="text-slate-400" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Configuration</span>
                  </div>
                  <div className="p-5">
                    <ProcessInput processes={processes} setProcesses={setProcesses} />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Settings size={18} className="text-slate-400" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Algorithm</span>
                  </div>
                  <div className="p-5">
                    <AlgorithmSelector
                      algorithm={algorithm}
                      setAlgorithm={setAlgorithm}
                      quantum={quantum}
                      setQuantum={setQuantum}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={runSimulation}
                    className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <Play size={20} fill="currentColor" />
                    Run Simulation
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="flex items-center justify-center gap-2 w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 font-bold py-3.5 px-6 rounded-xl transition-all"
                  >
                    <RotateCcw size={20} />
                    Reset Workspace
                  </button>
                </div>
              </div>

              {/* Right Column: Visualization */}
              <div className="xl:col-span-8 space-y-6">
                {/* Real-time Status */}
                <ProcessState running={running} ready={ready} completed={completed} />

                {/* Timeline Visualization */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[300px]">
                  <GanttChart timeline={timeline} />
                </div>

                {/* Performance Metrics */}
                <MetricsPanel metrics={metrics} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-6 max-w-4xl mx-auto w-full">
            <InfoSection />
          </div>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 <span className="font-semibold text-slate-800">SchedulerPro</span>. Designed for academic analysis and process optimization.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">v1.2.0 Production</span>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Activity size={18} /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Database size={18} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;