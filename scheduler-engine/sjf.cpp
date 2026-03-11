#include <vector>
#include <climits>
#include "process.h"
#include "event.h"

using namespace std;

vector<Event> sjf(vector<Process>& processes)
{
    vector<Event> timeline;

    int n = processes.size();
    int completed = 0;
    int time = 0;

    vector<bool> finished(n,false);

    while(completed < n)
    {
        int idx = -1;
        int shortest = INT_MAX;

        // find shortest available job
        for(int i=0;i<n;i++)
        {
            if(processes[i].arrival_time <= time &&
               !finished[i] &&
               processes[i].burst_time < shortest)
            {
                shortest = processes[i].burst_time;
                idx = i;
            }
        }

        if(idx == -1)
        {
            // CPU idle
            time++;
            continue;
        }

        Process &p = processes[idx];

        // run process completely
        for(int i=0;i<p.burst_time;i++)
        {
            timeline.push_back({time,p.pid});
            time++;
        }

        p.completion_time = time;
        p.turnaround_time = p.completion_time - p.arrival_time;
        p.waiting_time = p.turnaround_time - p.burst_time;

        finished[idx] = true;
        completed++;
    }

    return timeline;
}