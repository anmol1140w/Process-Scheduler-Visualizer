import { useState } from "react";
import { Layout, Play, RotateCcw, Activity, Settings, List, Info, Database } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { VARIANTS } from "./utils/motion";
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
  const [ready] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const runSimulation = async (demoMode = false) => {
    let currentProcesses = processes;
    let currentAlgorithm = algorithm;
    let currentQuantum = quantum;

    if (demoMode === true) {
      currentProcesses = [
        { pid: "1", arrival: "0", burst: "5", priority: "2" },
        { pid: "2", arrival: "2", burst: "3", priority: "1" },
        { pid: "3", arrival: "4", burst: "1", priority: "3" },
        { pid: "4", arrival: "5", burst: "4", priority: "2" },
      ];
      currentAlgorithm = "rr";
      currentQuantum = "2";
      setProcesses(currentProcesses);
      setAlgorithm(currentAlgorithm);
      setQuantum(currentQuantum);
    }

    if (!currentProcesses || currentProcesses.length === 0) {
      toast.error("Please add at least one process to start the simulation.");
      return;
    }

    if (currentAlgorithm === "rr" && (!currentQuantum || currentQuantum <= 0)) {
      toast.error("Round Robin requires a Time Quantum greater than 0.");
      return;
    }

    const request = {
      algorithm: currentAlgorithm,
      quantum: parseInt(currentQuantum) || 0,
      processes: currentProcesses.map((p) => ({
        pid: parseInt(p.pid),
        arrival: parseInt(p.arrival),
        burst: parseInt(p.burst),
        priority: parseInt(p.priority) || 0,
      })),
    };

    try {
      const result = await runScheduler(request);

      if (!result || !result.timeline || result.timeline.length === 0) {
        toast.error("No simulation data was generated. Please check your inputs.");
        return;
      }

      toast.success("Simulation running...");

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
          toast.success("Simulation complete", {
            description: "View results in the timeline and metrics panel."
          });
          return;
        }

        const current = data[i];
        setTimeline((prev) => [...prev, "P" + parseInt(current.pid)]);
        setRunning("P" + parseInt(current.pid));
        i++;
      }, 500);
    } catch (error) {
      console.error("Simulation error:", error);
      toast.error("Simulation engine error: " + error.message);
    }
  };

  const resetSimulation = () => {
    setTimeline([]);
    setMetrics([]);
    setRunning("");
    setCompleted([]);
    setProcesses([]);
    setAlgorithm("fcfs");
    setQuantum(0);
  };

  const resetWorkspace = () => {
    resetSimulation();
    toast.success("Workspace reset to initial state");
  };

  const loadSampleData = () => {
    setProcesses([
      { pid: "1", arrival: "0", burst: "5", priority: "2" },
      { pid: "2", arrival: "2", burst: "3", priority: "1" },
      { pid: "3", arrival: "4", burst: "1", priority: "3" },
      { pid: "4", arrival: "5", burst: "4", priority: "2" },
    ]);
    setAlgorithm("rr");
    setQuantum("2");
    toast.success("Sample processes loaded");
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-gradient-to-br from-slate-50 to-slate-100/80 flex flex-col font-sans text-slate-700 relative">
      <Toaster position="bottom-right" richColors toastOptions={{ style: { borderRadius: '12px' } }} />
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
          <div className="flex-1 overflow-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Control Panel Grid */}
            <motion.div 
              className="grid grid-cols-1 xl:grid-cols-12 gap-6 leading-relaxed items-start"
              variants={VARIANTS.fadeUp}
              initial="hidden"
              animate="show"
            >
              {/* Left Column: Inputs (Sticky) */}
              <motion.div className="xl:col-span-4 space-y-6 xl:sticky xl:top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200" variants={VARIANTS.fadeUp}>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded border border-slate-200/60 bg-white text-slate-500 text-[10px] font-bold shadow-sm uppercase tracking-tight">Step 1</span>
                    <span className="text-[13px] font-semibold text-slate-800">Process setup</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500 font-medium mb-4 italic">Add your processes manually or load a preset.</p>
                    <ProcessInput processes={processes} setProcesses={setProcesses} />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded border border-slate-200/60 bg-white text-slate-500 text-[10px] font-bold shadow-sm uppercase tracking-tight">Step 2</span>
                    <span className="text-[13px] font-semibold text-slate-800">Algorithm configuration</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500 font-medium mb-4 italic">Choose a CPU scheduling strategy.</p>
                    <AlgorithmSelector
                      algorithm={algorithm}
                      setAlgorithm={setAlgorithm}
                      quantum={quantum}
                      setQuantum={setQuantum}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 relative group">
                  <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded border border-slate-200/60 bg-white text-slate-500 text-[10px] font-bold shadow-sm uppercase tracking-tight">Step 3</span>
                    <span className="text-[13px] font-semibold text-slate-800">Simulation control</span>
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <motion.button
                      whileHover={{ y: -1, boxShadow: "0 4px 12px -2px rgb(79 70 229 / 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => runSimulation(false)}
                      disabled={processes.length === 0}
                      className="group/btn flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play size={18} fill="currentColor" className="group-hover/btn:animate-pulse" />
                      Run Simulation
                    </motion.button>
                    
                    <p className="text-center text-[11px] text-slate-500 font-medium pb-2">
                      {processes.length === 0 ? (
                        <span className="text-rose-500 animate-pulse">Wait! Add at least 1 process to begin.</span>
                      ) : (
                        "Computes scheduling paths & updates panels."
                      )}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={resetWorkspace}
                        className="flex items-center justify-center gap-2 w-full bg-transparent hover:bg-slate-50 text-slate-400 hover:text-slate-600 text-xs font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none"
                      >
                        <RotateCcw size={14} />
                        Reset Workspace
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Visualization */}
              <motion.div className="xl:col-span-8 space-y-6" variants={VARIANTS.fadeUp}>
                {/* Real-time Status */}
                <ProcessState running={running} ready={ready} completed={completed} />

                {/* Timeline Visualization */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[300px] hover:shadow-md transition-shadow duration-300">
                  <GanttChart 
                    timeline={timeline}
                    onLoadSample={loadSampleData}
                    onRunDemo={() => runSimulation(true)}
                  />
                </div>

                {/* Performance Metrics */}
                <MetricsPanel metrics={metrics} />
              </motion.div>
            </motion.div>
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