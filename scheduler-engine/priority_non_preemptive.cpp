#include <vector>
#include <climits>
#include "process.h"
#include "event.h"

using namespace std;

vector<Event> priority_non_preemptive(vector<Process>& processes)
{
    vector<Event> timeline;

    int n = processes.size();
    int completed = 0;
    int time = 0;

    vector<bool> finished(n,false);

    while(completed < n)
    {
        int idx = -1;
        int best_priority = INT_MAX;

        // find highest priority process
        for(int i=0;i<n;i++)
        {
            if(processes[i].arrival_time <= time &&
               !finished[i] &&
               processes[i].priority < best_priority)
            {
                best_priority = processes[i].priority;
                idx = i;
            }
        }

        if(idx == -1)
        {
            time++;
            continue;
        }

        Process &p = processes[idx];

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