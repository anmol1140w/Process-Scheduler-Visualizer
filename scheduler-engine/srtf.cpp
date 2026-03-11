#include <vector>
#include <climits>
#include "process.h"
#include "event.h"

using namespace std;

vector<Event> srtf(vector<Process>& processes)
{
    vector<Event> timeline;

    int n = processes.size();
    int completed = 0;
    int time = 0;

    for(int i=0;i<n;i++)
        processes[i].remaining_time = processes[i].burst_time;

    while(completed < n)
    {
        int idx = -1;
        int shortest = INT_MAX;

        for(int i=0;i<n;i++)
        {
            if(processes[i].arrival_time <= time &&
               processes[i].remaining_time > 0 &&
               processes[i].remaining_time < shortest)
            {
                shortest = processes[i].remaining_time;
                idx = i;
            }
        }

        if(idx == -1)
        {
            time++;
            continue;
        }

        Process &p = processes[idx];

        timeline.push_back({time,p.pid});

        p.remaining_time--;
        time++;

        if(p.remaining_time == 0)
        {
            completed++;

            p.completion_time = time;
            p.turnaround_time = p.completion_time - p.arrival_time;
            p.waiting_time = p.turnaround_time - p.burst_time;
        }
    }

    return timeline;
}