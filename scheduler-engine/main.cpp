#include <iostream>
#include <fstream>
#include <vector>

#include "process.h"
#include "event.h"

#include "include/json.hpp"

using json = nlohmann::json;
using namespace std;


/* function declarations */

vector<Event> fcfs(vector<Process>&);
vector<Event> sjf(vector<Process>&);
vector<Event> srtf(vector<Process>&);
vector<Event> round_robin(vector<Process>&, int);
vector<Event> priority_non_preemptive(vector<Process>&);
vector<Event> priority_preemptive(vector<Process>&);


int main(int argc, char* argv[])
{
    if(argc < 3)
    {
        cout << "Usage: ./scheduler input.json output.json\n";
        return 1;
    }

    string input_file = argv[1];
    string output_file = argv[2];
    ifstream file(input_file);
    json input;

    file >> input;

    string algorithm = input["algorithm"];
    int quantum = input.value("quantum",1);

    vector<Process> processes;

    for(auto &p : input["processes"])
    {
        Process proc;

        proc.pid = p["pid"];
        proc.arrival_time = p["arrival"];
        proc.burst_time = p["burst"];
        proc.priority = p.value("priority",0);

        processes.push_back(proc);
    }

    vector<Event> timeline;

    if(algorithm == "fcfs")
        timeline = fcfs(processes);

    else if(algorithm == "sjf")
        timeline = sjf(processes);

    else if(algorithm == "srtf")
        timeline = srtf(processes);

    else if(algorithm == "rr")
        timeline = round_robin(processes, quantum);

    else if(algorithm == "priority_np")
        timeline = priority_non_preemptive(processes);

    else if(algorithm == "priority_p")
        timeline = priority_preemptive(processes);


    json output;

    for(auto &e : timeline)
    {
        output["timeline"].push_back({
            {"time", e.time},
            {"pid", e.pid}
        });
    }

    for(auto &p : processes)
    {
        output["metrics"].push_back({
            {"pid", p.pid},
            {"waiting", p.waiting_time},
            {"turnaround", p.turnaround_time},
            {"completion", p.completion_time}
        });
    }

    ofstream out(output_file);
    out << output.dump(4);

    cout << "Scheduling complete. Output written to " << output_file << "\n";
}