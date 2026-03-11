import { useState } from "react"

function AlgorithmSelector({algorithm,setAlgorithm,quantum,setQuantum}) {

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value)
  }

  return (
    <div>

      <h2>Algorithm</h2>

      <select value={algorithm} onChange={handleAlgorithmChange}>

        <option value="FCFS">FCFS</option>
        <option value="SJF">SJF</option>
        <option value="RR">Round Robin</option>
        <option value="PRIORITY">Priority</option>

      </select>

      {algorithm === "RR" && (
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