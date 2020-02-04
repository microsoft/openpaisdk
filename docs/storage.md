# Storage Operations

Multiple types of storages are supported by OpenPAI, however, the end user and developers should not be bothered by too much details of it. The SDK provides an abstract storage accessing methods to let users access the storages.

For the cluster (client) object in SDK, it would provide path parsing and storage accessing methods (`getinfo, listdir, upload, download, delete`) with the following type of path

```ts
list = await openPAIClient.storageOperation.getinfo(
    configname, 
    mountpoint, 
    remotePath
    );
await openPAIClient.storageOperation.upload(
    localSrcpath, 
    configname, 
    mountpoint, 
    remotePath
    );
```
Here `configname` and `moutpoint` could be found in the the retrieved [storage config](https://github.com/microsoft/pai/tree/master/contrib/storage_plugin#config-data-structure-) by the [get storage config API](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/microsoft/pai/master/src/rest-server/docs/swagger.yaml#operation/getStorageConfigs), and `remotePath` is your destination path relative to the mount point.

The response of get storage config API contains a list of storage paths like 
```json
{
  "name": "string",
  "servers": [
    "string"
  ],
  "mountInfos": [
    {
      "mountPoint": "string",
      "path": "string",
      "server": "string",
      "permission": "string"
    }
  ]
}
```

## CLI interface

The users of CLI could be able to access the storage configs provisioned by the cluster like below
```bash
pai getinfo ${cluster-alias} ${storageconfig} ${mountpoint} remotePath
```
Here, `${cluster-alias}` is the cluster alias that could be indexed in local environment.