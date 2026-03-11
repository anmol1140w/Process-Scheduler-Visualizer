import { useState } from "react"
import GanttChart from "./components/GanttChart"
import ProcessInput from "./components/ProcessInput"
import AlgorithmSelector from "./components/AlgorithmSelector"
import MetricsPanel from "./components/MetricsPanel"
import ProcessState from "./components/ProcessState"
import { runScheduler } from "./services/schedulerApi"

function App() {

  const [timeline, setTimeline] = useState([])
  const [processes, setProcesses] = useState([])
  const [algorithm, setAlgorithm] = useState("fcfs")
  const [quantum, setQuantum] = useState(0)
  const [metrics, setMetrics] = useState([])
  const [running, setRunning] = useState("")
  const [ready, setReady] = useState([])
  const [completed, setCompleted] = useState([])

  const runSimulation = async () => {

    if (!processes || processes.length === 0) {
      alert("Please add at least one process.")
      return
    }

    const request = {
      algorithm,
      quantum: parseInt(quantum),
      processes: processes.map(p => ({
        pid: parseInt(p.pid),
        arrival: parseInt(p.arrival),
        burst: parseInt(p.burst),
        priority: parseInt(p.priority)
      }))
    }

    try {
      const result = await runScheduler(request)

      if (!result || !result.timeline || result.timeline.length === 0) {
        alert("No timeline data returned.")
        return
      }

      const data = result.timeline
      let i = 0

      // Reset before starting
      setTimeline([])
      setCompleted([])
      setMetrics([])

      const interval = setInterval(() => {

        if (i >= data.length) {
          clearInterval(interval)
          setRunning("")
          setCompleted(result.metrics.map(m => "P" + parseInt(m.pid)))
          setMetrics(result.metrics)
          return
        }

        const current = data[i]

        setTimeline(prev => [...prev, "P" + parseInt(current.pid)])
        setRunning("P" + parseInt(current.pid))

        i++

      }, 1000)

    } catch (error) {
      console.error("Simulation error:", error)
      alert("Scheduler failed: " + error.message)
    }
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Process Scheduler Visualizer</h1>

      <AlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        quantum={quantum}
        setQuantum={setQuantum}
      />

      <ProcessInput setProcesses={setProcesses} />

      <h2>Processes</h2>
      {processes.map((p, i) => (
        <div key={i}>
          {parseInt(p.pid)} | Arrival: {parseInt(p.arrival)} | Burst: {parseInt(p.burst)} | Priority: {parseInt(p.priority)}
        </div>
      ))}

      <button onClick={runSimulation}>Run Simulation</button>

      <button onClick={() => {
        setTimeline([])
        setMetrics([])
        setRunning("")
        setCompleted([])
      }}>
        Reset
      </button>

      <ProcessState
        running={running}
        ready={ready}
        completed={completed}
      />

      <GanttChart timeline={timeline} />

      <MetricsPanel metrics={metrics} />

    </div>
  )
}
export default App