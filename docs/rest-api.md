# RESTful APIs

Initialize the `openPAIClient`

```ts
import { PAIV2 } from '@microsoft/openpai-js-sdk';

const cluster: PAIV2.IPAICluster = {
    username: '<username>',
    password: '<password>',
    token: '<token>',
    rest_server_uri: '<The host>/rest-server'
};
const openPAIClient = new PAIV2.OpenPAIClient(cluster);
```

## api info

## token

- [x] Get your currently signed tokens (GET /api/v2/tokens)

    ```ts
    tokens = await openPAIClient.auth.getTokens();
    ```

- [x] Revoke a token (DELETE /api/v2/tokens/{token})

    ```ts
    await openPAIClient.auth.deleteToken(token);
    ```

- [x] Create an application access token in the system (POST /api/v2/tokens/application)

    ```ts
    token = await openPAIClient.auth.createApplicationToken();
    ```

## authn

- [x] User login with Azure AD (GET /api/v2/authn/oidc/login)

    ```ts
    redirect = await openPAIClient.authn.oidcLogin();
    ```

- [x] User logout from Azure AD (GET /api/v2/authn/oidc/logout)

    ```ts
    redirect = await openPAIClient.authn.oidcLogout();
    ```

- [x] Get an access token using username and password (POST /api/v2/authn/basic/login)

    ```ts
    loginInfo = await openPAIClient.authn.login(username, password);
    ```

- [x] Logout and revoke the token (DELETE /api/v2/authn/basic/logout)

    ```ts
    await openPAIClient.authn.logout();
    ```

## user

- [x] Create a user in the system (POST /api/v2/users/)

    ```ts
    await openPAIClient.user.createUser(user);
    await openPAIClient.user.createUser({username, password, admin, email, virtualClusters});
    ```

- [x] Get all users in the system (GET /api/v2/users/)

    ```ts
    list = await openPAIClient.user.getAllUser();
    ```

- [x] Update a user in the system (PUT /api/v2/users)

    ```ts
    await openPAIClient.user.updateVirtualcluster(user);
    await openPAIClient.user.updateVirtualcluster(user, patch);
    ```

- [x] Update user's own profile (PUT /api/v2/users/me)

    ```ts
    await openPAIClient.user.updateUserSelf(user);
    await openPAIClient.user.updateUserSelf(user, patch);
    ```

- [x] Get a user's data (GET /api/v2/users/{username})

    ```ts
    user = await openPAIClient.user.getUser(username);
    ```

- [x] Remove a user in the system (DELETE /api/v2/users/{username})

    ```ts
    await openPAIClient.user.deleteUser(username);
    ```

- [x] Add a group for user (PUT /api/v2/users/{username}/group/)

    ```ts
    await openPAIClient.user.updateUserGroup(username, groupname);
    ```

- [x] Remove a group from user's grouplist (DELETE /api/v2/users/{username}/group)

    ```ts
    await openPAIClient.user.removeGroup(username, groupName);
    ```

- [x] Replace user's grouplist (PUT /api/v2/users/{username}/grouplist/)

    ```ts
    await openPAIClient.user.updateUserGrouplist(username, grouplist);
    ```

## group

- [x] Get all group objects in the system (GET /api/v2/groups)

    ```ts
    groups = await openPAIClient.group.getAllGroup();
    ```

- [x] Create a group in the system (POST /api/v2/groups)

    ```ts
    await openPAIClient.group.createGroup(group);
    ```

- [x] Update a group in the system (PUT /api/v2/groups)

    ```ts
    await openPAIClient.group.updateGroup(group);
    ```

- [x] Get a group in the system (GET /api/v2/groups/{groupname})

    ```ts
    group = await openPAIClient.group.getGroup(groupname);
    ```

- [x] Delete a group in the system (DELETE /api/v2/groups/{groupname})

    ```ts
    await openPAIClient.group.deleteGroup(groupname);
    ```

- [x] Get the user array of a group in the system (GET /api/v2/groups/{groupname}/userlist)

    ```ts
    users = await openPAIClient.group.getGroupMembers(groupname);
    ```

## virtual cluster

- [x] Get the list of virtual clusters (GET /api/v2/virtual-clusters)

    ```ts
    list = await openPAIClient.virtualCluster.listVirtualClusters();
    ```

- [x] Get virtual cluster status in the system (GET /api/v2/virtual-clusters/{vcName})

    ```ts
    vc = await openPAIClient.virtualCluster.getVirtualCluster(vcName);
    ```

## job

- [x] Submit a job in the system (POST /api/v2/jobs)

    ```ts
    await openPAIClient.job.createJob(config);
    ```

- [x] Get the list of jobs (GET /api/v2/jobs)

    ```ts
    list = await openPAIClient.job.listJobs();
    list = await openPAIClient.job.listJobs(username);
    ```

- [x] Get job status (GET /api/v2/jobs/{username}~{jobname})

    ```ts
    job = await openPAIClient.job.getJob(username, jobname);
    ```

- [x] Get job config (GET /api/v2/jobs/{username}~{jobname}/config)

    ```ts
    config = await openPAIClient.job.getJobConfig(username, jobname);
    ```

- [x] Start or stop a job (PUT /api/v2/jobs/{username}~{jobname}/exectionType)

    ```ts
    await openPAIClient.job.updateJobExecutionType(username, jobname, 'START');
    await openPAIClient.job.updateJobExecutionType(username, jobname, 'STOP');
    ```

- [x] Add a tag to a job (PUT /api/v2/jobs/{username}~{jobname}/tag)

    ```ts
    await openPAIClient.job.addTag(username, jobname, tag);
    ```

- [x] Delete a tag from a job (DELETE /api/v2/jobs/{username}~{jobname}/tag)

    ```ts
    await openPAIClient.job.deleteTag(username, jobname, tag);
    ```

## job history

- [x] Check if job attempts is healthy (GET /api/v2/jobs/{username}~{jobname}/job-attempts/healthz)

    ```ts
    response = await openPAIClient.job.getJobAttemptsHealthz(username, jobname);
    ```

- [x] Get all attempts of a job (GET /api/v2/jobs/{user}~{job}/job-attempts)

    ```ts
    attempts = await openPAIClient.job.getJobAttempts(username, jobname);
    ```

- [x] Get a specific attempt by attempt index (GET /api/v2/jobs/{user}~{job}/job-attempts/{attempt})

    ```ts
    attempt = await openPAIClient.job.getJobAttempt(username, jobname, index);
    ```

## storage

- [x] Get storage list (persistent volume claims) for current user (GET /api/v2/storages)

    ```ts
    storages = await openPAIClient.storage.getStorages();
    ```

- [x] Get storage (persistent volume claim) for the given name (GET /api/v2/storages/{storagename})

    ```ts
    storage = await openPAIClient.storage.getStorage(storagename);
    ```

## kubernetes

- [x] Get kubernetes node list (GET /api/v2/kubernetes/nodes)

    ```ts
    nodes = await openPAIClient.kubernetes.getK8sNodes();
    ```

- [x] Get kubernetes pod list (GET /api/v2/kubernetes/pods)

    ```ts
    pods = await openPAIClient.kubernetes.getK8sPods();
    ```
