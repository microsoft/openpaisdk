Schedule Job Among Multiple Clusters
====

## Motivation

This scheme is designed to let a computing job be scheduled among multiple heterogeneous `OpenPAI` clusters but without any modification of the scheduling in the cluster. 

Since the clusters are heterogeneous and the computing power may be significantly different, the goal of this scheduling is to launch a job (a) **in a short waiting time**, and (b) **in a powerful cluster**.

## Describing a multi-cluster job 

Suppose there are $n$ clusters *C_1*, .., *C_n* as below, each of them provides RESTful API to `submit`, `query` and `cancel` a job. The job running on clusters has sequential states such as `WAITING`, `RUNNING`, `SUCCESS` and `FAILED`.

|       | Alias * | Uri           | GPU type | Priority ** |
| ----- | ------- | ------------- | -------- | ----------- |
| *C_1* | alias-1 | cluster.uri.1 | V100     | *p_1*       |
| ..    | ..      | ..            | ..       | ..          |
| *C_n* | alias-n | cluster.uri.n | K80      | *p_n*       |

*\*: alias should be unique for each cluster (default is the URI)*</br>
*\*\*: Priority is a number in the range of 0 and 100, more details of which will be described later*

To describe the deep learning job with multiple cluster configuration, we need to implement the *Multiple-Cluster-Configuration (MCC)* the [job protocol](github.com/microsoft/openpai-protocol) and provide a specialize method in the [SDK](github.com/microsoft/openpaisdk).

Below is an example of defining a job for two clusters. Since users need to handle their data for each cluster (by [teamwise storage configuration](github.com/microsoft/pai/src/kube-runtime/src/plugins/teamwise_storage/README.md)), we give the example of configuring data storages and parameters (e.g. `gpuNum`).

```yaml
protocolVersion: super-2 # prefixed with super- means this is a muli-cluster job
name: mc-job-name
secrets:
  token-<alias-1>: <token-1>
  token-<alias-2>: <token-2> 
taskRoles:
  main:
    resourcePerInstance:
      gpu: <% $mcc.gpuNum %>
extra:
  com.microsoft.pai.runtimeplugin:
    - plugin: teamwiase_storage
      parameters:
        storageConfigNames: <% $mcc.storageConfigs %>
    - plugin: super_scheduler
      parameters:
        clusters:
          <alias-1>:
            uri: <pai-uri-1> 
            user: <username-1>
          <alias-2>:
            uri: <pai-uri-2>
            user: <username-2>
        guardTimeRunning: 10 # 10 minutes
        timeScale: 1 # 1 minute
        params: # define key-values for each parameter and each cluster
          gpuNum:
            <alias-1>: <gpu-num-1>
            <alias-2>: <gpu-num-2>
          storageConfigs:
            <alias-1>: 
              - <storage-config-1-1>
              - <storage-config-1-2>
            <alias-2>:
              - <storage-config-2-1>
```

The specialization method will generate the job configuration for a given cluster, which will replace `<% $mcc.xxx %>` to its corresponding value. Here is the specialized result of cluster-1 (only the difference lines are listed)

```yaml
protocolVersion: '2' # super-2
name: mc-job-name-<alias-1>
taskRoles:
  main:
    resourcePerInstance:
      gpu: <gpu-num-1> # <% $mcc.gpuNum %>
extra:
  com.microsoft.pai.runtimeplugin:
    - plugin: teamwiase_storage
      parameters:
        storageConfigNames: # <% $mcc.storageConfigs %>
          - <storage-config-1-1>
          - <storage-config-1-2>
```


## First-Available-Cluster scheduling

The First-Available-Cluster (FAC) policy would be the most simple and straightforward policy. The scheduler submits the job to all the clusters and periodically query the status of them. When one of the jobs is successfully scheduled (to `RUNNING` state for a guard time), the scheduler will cancel (kill) all other jobs and return the scheduled job and corresponding cluster to user. 

If more than one jobs are scheduled, the scheduler will keep only the one entering `RUNNING` state earliest, and cancel others.  

To implement within existing RESTful APIs, we choose a *Submit-Then-Cancel* method to test the availability of each cluster.   

## FAC with priority

The problem of FAC policy is that it takes all the clusters equally, without noticing the difference of computing powers. However, users may have preference between clusters, for example, most users want their jobs to be scheduled on the powerful clusters. 

To solve the problem, we let users give their preference of clusters by scoring every cluster with a number between 0~100 (denoted by `Priority`). When a job is successfully scheduled in cluster *C_i* with priority *p_i*, then all jobs submitted to clusters whose priority is smaller than *p_i* will be cancelled intermediately, but the jobs submitted to higher priority clusters will have an extra surviving time. 

For example, there is a cluster *C_j* of higher priority *p_j* (*p_j > p_i*), then *C_j*'s job will not be cancelled until *(p_j-p_i)\*timeScale* later. If *C_j*'s job is successfully scheduled in this time, the scheduler will choose *C_j* as the execution cluster and cancel the job on lower priority cluster *C_i*. 