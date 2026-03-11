function ProcessState({running, ready, completed}) {

  return (
    <div style={{marginTop:"20px"}}>

      <h2>Process States</h2>

      <div>
        <strong>Running:</strong> {running || "None"}
      </div>

      <div>
        <strong>Ready Queue:</strong> {ready.join(" ") || "Empty"}
      </div>

      <div>
        <strong>Completed:</strong> {completed.join(" ") || "None"}
      </div>

    </div>
  )

}

export default ProcessState