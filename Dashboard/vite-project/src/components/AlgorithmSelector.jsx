import { useState } from "react"

function AlgorithmSelector({algorithm,setAlgorithm,quantum,setQuantum}) {

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value)
  }

  return (
    <div>

      <h2>Algorithm</h2>

      <select value={algorithm} onChange={handleAlgorithmChange}>

        <option value="fcfs">FCFS</option>
        <option value="sjf">SJF</option>
        <option value="rr">Round Robin</option>
        <option value="priority_np">Priority (Non-Preemptive)</option>
        <option value="priority_p">Priority (Preemptive)</option>

      </select>

      {algorithm === "rr" && (
        <div style={{marginTop:"10px"}}>

          <label>Quantum: </label>

          <input
            type="number"
            value={quantum}
            onChange={(e)=>setQuantum(e.target.value)}
          />

        </div>
      )}

    </div>
  )

}

export default AlgorithmSelector