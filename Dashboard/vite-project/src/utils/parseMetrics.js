function parseMetrics(text){

  const lines = text.split("\n")

  const metrics = []

  lines.forEach(line => {

    if(line.includes("WT")){

      const parts = line.split(" ")

      metrics.push({
        process: parts[0],
        waiting: parts[1].split("=")[1],
        tat: parts[2].split("=")[1]
      })

    }

  })

  return metrics
}

export default parseMetrics