#include <vector>
#include <queue>
#include "process.h"
#include "event.h"

using namespace std;

vector<Event> round_robin(vector<Process>& processes, int quantum)
{
    vector<Event> timeline;
    queue<int> ready;

    int n = processes.size();
    int completed = 0;
    int time = 0;

    vector<bool> in_queue(n,false);

    for(int i=0;i<n;i++)
        processes[i].remaining_time = processes[i].burst_time;

    while(completed < n)
    {
        // add newly arrived processes
        for(int i=0;i<n;i++)
        {
            if(processes[i].arrival_time <= time &&
               !in_queue[i] &&
               processes[i].remaining_time > 0)
            {
                ready.push(i);
                in_queue[i] = true;
            }
        }

        if(ready.empty())
        {
            time++;
            continue;
        }

        int idx = ready.front();
        ready.pop();

        Process &p = processes[idx];

        int run = min(quantum, p.remaining_time);

        for(int i=0;i<run;i++)
        {
            timeline.push_back({time,p.pid});
            time++;

            // check if new processes arrive
            for(int j=0;j<n;j++)
            {
                if(processes[j].arrival_time <= time &&
                   !in_queue[j] &&
                   processes[j].remaining_time > 0)
                {
                    ready.push(j);
                    in_queue[j] = true;
                }
            }
        }

        p.remaining_time -= run;

        if(p.remaining_time > 0)
        {
            ready.push(idx);
        }
        else
        {
            completed++;

            p.completion_time = time;
            p.turnaround_time = p.completion_time - p.arrival_time;
            p.waiting_time = p.turnaround_time - p.burst_time;
        }
    }

    return timeline;
}