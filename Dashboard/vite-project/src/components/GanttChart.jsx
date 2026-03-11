function GanttChart({timeline = []}) {

  return (
    <div>
      <h2>Gantt Chart</h2>

      <div style={{display:"flex"}}>
        {timeline.map((p,i)=>(
          <div
            key={i}
            style={{
              border:"1px solid black",
              padding:"20px",
              margin:"2px",
              minWidth:"50px",
              textAlign:"center",
              backgroundColor:
                p==="P1" ? "#4CAF50" :
                p==="P2" ? "#2196F3" :
                p==="P3" ? "#FF9800" :
                "#ccc"
            }}
          >
            {p}
          </div>
        ))}
      </div>

    </div>
  )

}

export default GanttChart