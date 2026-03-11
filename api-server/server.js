const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const schedulerPath =
  process.platform === "win32"
    ? path.join(__dirname, "../scheduler-engine/scheduler.exe")
    : path.join(__dirname, "../scheduler-engine/scheduler");

const inputFile = path.join(__dirname, "../scheduler-engine/input.json");
const outputFile = path.join(__dirname, "../scheduler-engine/output.json");

app.get("/", (req, res) => {
    res.send("Scheduler API running");
});

app.post("/schedule", (req, res) => {

    const data = req.body;

    fs.writeFileSync(inputFile, JSON.stringify(data, null, 2));

    exec(`"${schedulerPath}" "${inputFile}" "${outputFile}"`, (error) => {

        if (error) {
            console.log("Scheduler error:", error);
            return res.status(500).json({error: "Scheduler failed"});
        }

        const result = JSON.parse(fs.readFileSync(outputFile));

        res.json(result);
    });

});

app.listen(5000, () => {
    console.log("Scheduler API running on port 5000");
});