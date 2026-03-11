import { useState } from "react"

function ProcessInput({setProcesses}) {

  const [process,setProcess] = useState({
    pid:"",
    arrival:"",
    burst:"",
    priority:""
  })

  const handleChange = (e) => {
    setProcess({...process,[e.target.name]:e.target.value})
  }

  const addProcess = () => {
    setProcesses(prev => [...prev,process])

    setProcess({
      pid:"",
      arrival:"",
      burst:"",
      priority:""
    })
  }

  return (
    <div>

      <h2>Add Process</h2>

      <input
        placeholder="Process ID"
        name="pid"
        value={process.pid}
        onChange={handleChange}
      />

      <input
        placeholder="Arrival"
        name="arrival"
        value={process.arrival}
        onChange={handleChange}
      />

      <input
        placeholder="Burst"
        name="burst"
        value={process.burst}
        onChange={handleChange}
      />

      <input
        placeholder="Priority"
        name="priority"
        value={process.priority}
        onChange={handleChange}
      />

      <button onClick={addProcess}>Add</button>

    </div>
  )

}

export default ProcessInput