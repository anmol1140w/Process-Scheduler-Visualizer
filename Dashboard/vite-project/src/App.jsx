import { useState } from "react"
import GanttChart from "./components/GanttChart"
import ProcessInput from "./components/ProcessInput"
import AlgorithmSelector from "./components/AlgorithmSelector"
import MetricsPanel from "./components/MetricsPanel"
import ProcessState from "./components/ProcessState"
import { runScheduler } from "./services/schedulerApi"
function App() {

  const [timeline,setTimeline] = useState([])
  const [processes,setProcesses] = useState([])
  const [algorithm,setAlgorithm] = useState("FCFS")
  const [quantum,setQuantum] = useState(2)
  const [metrics,setMetrics] = useState([])
  const [running,setRunning] = useState("")
const [ready,setReady] = useState([])
const [completed,setCompleted] = useState([])

 const runSimulation = async () => {

  const request = {
    algorithm,
    quantum,
    processes
  }

  const result = await runScheduler(request)

  const data = result.timeline

  let i = 0

  const interval = setInterval(()=>{

    setTimeline(prev => [...prev,data[i]])
    setRunning(data[i])

    i++

    if(i===data.length){

      clearInterval(interval)

      setRunning("")
      setCompleted(result.metrics.map(m => m.process))

      setMetrics(result.metrics)

    }

  },1000)

}
  return (
    <div style={{padding:"20px"}}>

      <h1>Process Scheduler Visualizer</h1>
        <AlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        quantum={quantum}
        setQuantum={setQuantum}
        />
      <ProcessInput setProcesses={setProcesses}/>
      <h2>Processes</h2>

        {processes.map((p,i)=>(
          <div key={i}>
            {p.id} | Arrival: {p.arrival} | Burst: {p.burst}
          </div>
        ))}
     
      <button onClick={runSimulation}>Run Simulation</button>

      <button onClick={()=>{
          setTimeline([])
          setMetrics([])
        }}>
        Reset
        </button>
        <ProcessState
          running={running}
          ready={ready}
          completed={completed}
          />
      <GanttChart timeline={timeline}/>
      
      <MetricsPanel metrics={metrics}/>

    </div>
  )

}

export default App
