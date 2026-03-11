const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const schedulerPath = "../scheduler-engine/scheduler";
const inputFile = "../scheduler-engine/input.json";
const outputFile = "../scheduler-engine/output.json";

app.get("/", (req, res) => {
    res.send("Scheduler API running");
});

app.post("/schedule", (req, res) => {

    const data = req.body;

    // write input.json
    fs.writeFileSync(inputFile, JSON.stringify(data, null, 2));

    // run scheduler
    exec(`${schedulerPath} ${inputFile} ${outputFile}`, (error) => {

        if (error) {
            return res.status(500).json({error: "Scheduler failed"});
        }

        // read output
        const result = JSON.parse(fs.readFileSync(outputFile));

        res.json(result);
    });

});

app.listen(5000, () => {
    console.log("Scheduler API running on port 5000");
});