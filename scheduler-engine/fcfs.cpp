#include <vector>
#include <algorithm>
#include "process.h"
#include "event.h"

using namespace std;

vector<Event> fcfs(vector<Process>& processes)
{
    vector<Event> timeline;

    // sort by arrival time
    sort(processes.begin(), processes.end(),
         [](Process &a, Process &b)
         {
             return a.arrival_time < b.arrival_time;
         });

    int time = 0;

    for(auto &p : processes)
    {
        // CPU idle until process arrives
        if(time < p.arrival_time)
            time = p.arrival_time;

        // simulate execution
        for(int i = 0; i < p.burst_time; i++)
        {
            timeline.push_back({time, p.pid});
            time++;
        }

        // compute metrics
        p.completion_time = time;
        p.turnaround_time = p.completion_time - p.arrival_time;
        p.waiting_time = p.turnaround_time - p.burst_time;
    }

    return timeline;
}