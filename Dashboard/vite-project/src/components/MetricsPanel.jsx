function MetricsPanel({metrics}) {

  if(metrics.length === 0){
    return <h2>No Metrics Yet</h2>
  }

  return (

    <div>

      <h2>Metrics</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Process</th>
            <th>Waiting Time</th>
            <th>Turnaround Time</th>
          </tr>
        </thead>

        <tbody>

          {metrics.map((m,i)=>(
            <tr key={i}>
              <td>P{m.pid}</td>
              <td>{m.waiting}</td>
              <td>{m.turnaround}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}

export default MetricsPanel