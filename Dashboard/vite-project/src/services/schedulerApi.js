export async function runScheduler(data) {

  const response = await fetch("http://localhost:5000/schedule", {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  return result

}