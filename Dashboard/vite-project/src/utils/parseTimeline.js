function parseTimeline(text){

  const lines = text.split("\n")

  const timeline = []

  lines.forEach(line => {

    if(line.includes("->")){
      const process = line.split("->")[1].trim()
      timeline.push(process)
    }

  })

  return timeline
}

export default parseTimeline