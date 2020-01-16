# OpenPAI JS SDK

The `JavaScript` SDK for `OpenPAI`.

## Installation

```bash
npm install --save microsoft/pai#openpai-js-sdk
```

## RESTful APIs

Initialize the `openPAIClient`

```ts
const cluster: IPAICluster = {
    username: '<username>',
    password: '<password>',
    token: '<token>',
    rest_server_uri: '<The host>/rest-server'
};
const openPAIClient = new OpenPAIClient(cluster);
```

### Job related

- [x] List jobs (GET /api/v1/jobs)

    ```ts
    list = await openPAIClient.job.list();
    list = await openPAIClient.job.list('username=xxx');
    ```

- [x] Get job (GET /api/v2/user/{username}/jobs/{jobname})

    ```ts
    job = await openPAIClient.job.get(username, jobname);
    ```

- [x] Get framework info (GET /api/v2/jobs/{username}~{jobname})

    ```ts
    info = await openPAIClient.job.getFrameworkInfo(username, jobname);
    ```

- [x] Get job config (GET /api/v2/jobs/{username}~{jobname}/config)

    ```ts
    config = await openPAIClient.job.getConfig(username, jobname);
    ```

- [x] Get job ssh info (GET /api/v1/user/{username}/jobs/{jobname}/ssh)

    ```ts
    sshInfo = await openPAIClient.job.getSshInfo(username, jobname);
    ```

- [x] Submit v1 job (POST /api/v1/user/{username}/jobs)

    ```ts
    await openPAIClient.job.submitV1((userName, config)
    ```

- [x] Submit v2 job (POST /api/v2/jobs)

    ```ts
    await openPAIClient.job.submit(config);
    ```

- [x] Remove job (DELETE /api/v2/user/{username}/jobs/{jobname})

    ```ts
    await openPAIClient.job.delete(username, jobname);
    ```

- [x] Start/Stop job (PUT /api/v2/user/{username}/jobs/{jobname}/executionType)

    ```ts
    await openPAIClient.job.execute(username, jobname, 'START');
    await openPAIClient.job.execute(username, jobname, 'STOP');
    ```

### User related

- [x] Get user (GET /api/v2/user/{username})

    ```ts
    user = await openPAIClient.user.get(username);
    ```

- [x] List users (GET /api/v2/user/)

    ```ts
    list = await openPAIClient.user.list();
    ```

- [x] Create user (POST /api/v2/user/)

    ```ts
    await openPAIClient.user.create(username, password, admin, email, virtualClusters);
    ```

- [x] Delete user (DELETE /api/v2/user/{username})

    ```ts
    await openPAIClient.user.delete(username);
    ```

- [x] Update user extension (PUT /api/v2/user/{username}/extension)

    ```ts
    await openPAIClient.user.updateExtension(username, {
        "extension-key1": "extension-value1",
        "extension-key2": "extension-value2",
        ...
    });
    ```

- [x] Update user virtual cluster (PUT /api/v2/user/{username}/virtualcluster)

    ```ts
    await openPAIClient.user.updateVirtualcluster(username, ['vc1', 'vc2', ...]);
    ```

- [x] Update user password (PUT /api/v2/user/{username}/password)

    ```ts
    await openPAIClient.user.updatePassword(username, oldPassword, newPassword);
    ```

- [x] Update user email (PUT /api/v2/user/{username}/email)

    ```ts
    await openPAIClient.user.updateEmail(username, newEmail);
    ```

- [x] Update user admin permission (PUT /api/v2/user/{username}/admin)

    ```ts
    await openPAIClient.user.updateAdminPermission(username, newAdminPermission);
    ```

- [x] Update user group list (PUT /api/v2/user/{username}/grouplist)

    ```ts
    await openPAIClient.user.updateGroupList(username, ['group1', 'group2', ...]);
    ```

- [x] Add group into user group list (PUT /api/v2/user/{username}/group)

    ```ts
    await openPAIClient.user.addGroup(username, groupName);
    ```

- [x] Remove group from user group list (DELETE /api/v2/user/{username}/group)

    ```ts
    await openPAIClient.user.removeGroup(username, groupName);
    ```

### VC related

- [x] List all virtual clusters (GET /api/v2/virtual-clusters)

    ```ts
    list = await openPAIClient.virtualCluster.list();
    ```

- [x] Get node resource (GET /api/v2/virtual-clusters/nodeResource)

    ```ts
    resource = await openPAIClient.virtualCluster.getNodeResource();
    ```

- [x] Get virtual cluster (GET /api/v2/virtual-clusters/{vcName})

    ```ts
    vc = await openPAIClient.virtualCluster.get(vcName);
    ```

- [x] Create or update virtual cluster (PUT /api/v1/virtual-clusters/{vcName})

    ```ts
    await openPAIClient.virtualCluster.createOrUpdate(vcName, vcCapacity, vcMaxCapacity);
    ```

- [x] Remove virtual cluster (DELETE /api/v1/virtual-clusters/{vcName})

    ```ts
    await openPAIClient.virtualCluster.delete(vcName);
    ```

- [x] Change virtual cluster status (PUT /api/v1/virtual-clusters/{vcName}/status)

    ```ts
    await openPAIClient.virtualCluster.changeStatus(vcName, newStatus);
    ```

- [ ] Get virtual cluster available resourceUnit (GET /api/v2/virtual-clusters/{vcName}/resourceUnits)

    ```json
    {
        "code":"NotImplementedError",
        "message":"getResourceUnits not implemented in yarn"
    }
    ```

### Auth related

- [x] Get token (POST /api/v1/token)

    ```ts
    token = await openPAIClient.token();
    ```

- [x] Get auth info (GET /api/v1/authn/info)

    ```ts
    info = await openPAIClient.authn.info();
    ```

- [x] Basic login (POST /api/v1/authn/basic/login)

    ```ts
    loginInfo = await openPAIClient.authn.login();
    ```

- [x] OIDC login (GET /api/v1/authn/oidc/login)

    ```ts
    redirect = await openPAIClient.authn.oidcLogin();
    ```

- [x] OIDC logout (GET /api/v1/authn/oidc/logout)

    ```ts
    redirect = await openPAIClient.authn.oidcLogout();
    ```

- [x] Get list of available tokens (portal token + application token) (GET /api/v1/token)

    ```ts
    tokens = await openPAIClient.auth.getTokens();
    ```

- [x] Create an application access token (POST /api/v1/token/application)

    ```ts
    token = await openPAIClient.auth.createApplicationToken();
    ```

- [x] Revoke a token (DELETE /api/v1/token/{token})

    ```ts
    await openPAIClient.auth.deleteToken(token);
    ```

- [ ] OIDC return (GET/POST /api/v1/authn/oidc/return)

    ```text
    Web-browser will call this API automatically after OIDC login step.
    ```

### Group related

- [ ] Create a group (POST /api/v2/group)
- [ ] Change a group's extension
      (POST /api/v2/group/:groupname/extension)
- [ ] Change a specific attribute in a nested group extension
      (PUT /api/v2/group/:groupname/extension/path/to/attr)
- [ ] Change a group's description
      (POST /api/v2/group/:groupname/description)
- [ ] Change a group's externalname, and bind it with another external group
      (POST /api/v2/group/:groupname/externalname)
- [ ] Delete a group from system (DELETE /api/v2/group/:groupname)

### Storage

- [x] Get storage server data in the system (GET /api/v2/storage/server/{storage})

    ```ts
    await openPAIClient.storage.getServerByName(storage);
    ```

- [ ] Remove storage server in the system (DELETE /api/v2/storage/server/{storage})
- [x] Get storage server data in the system (GET /api/v2/storage/server)

    ```ts
    await openPAIClient.storage.getServer();
    await openPAIClient.storage.getServer(names);
    ```

- [ ] Create storage server in the system (POST /api/v2/storage/server)
- [ ] Update storage server in the system (PUT /api/v2/storage/server)
- [x] Get storage config data in the system (GET /api/v2/storage/config/{storage})

    ```ts
    await openPAIClient.storage.getConfigByName(storage);
    ```

- [ ] Remove storage config in the system (DELETE /api/v2/storage/config/{storage})
- [x] Get storage config data in the system (GET /api/v2/storage/config)

    ```ts
    await openPAIClient.storage.getConfig();
    await openPAIClient.storage.getConfig(names);
    ```

- [ ] Create storage config in system (POST /api/v2/storage/config)
- [ ] Update storage config in system (PUT /api/v2/storage/config)

### Job history

- [ ] Check if job attempts is healthy (GET /api/v2/jobs/{user}~{job}/job-attempts/healthz)
- [ ] Get all attempts of a job (GET /api/v2/jobs/{user}~{job}/job-attempts)
- [ ] Get a specific attempt by attempt index
      (GET /api/v2/jobs/{user}~{job}/job-attempts/{attempt})

## Useful tools

- [ ] To be added...

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
