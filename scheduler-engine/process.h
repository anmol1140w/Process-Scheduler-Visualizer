#ifndef PROCESS_H
#define PROCESS_H

struct Process
{
    int pid;
    int arrival_time;
    int burst_time;
    int priority; // optional, can be used for priority scheduling

    int remaining_time;

    int completion_time;
    int turnaround_time;
    int waiting_time;
};

#endif