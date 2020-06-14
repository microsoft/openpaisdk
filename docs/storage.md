# Storage Operations

Multiple types of storages are supported by OpenPAI, however, the end user and developers should not be bothered by too much details of it. The SDK offers an abstract storage accessing layer to let users access the cluster provisioned storages.

## Fetch storage object
User could get the `IStorageNode` object for each cluster provisioned storage by 

```ts
// get a storage object with its name
let storageDetail: IStorageDetail = await opanPAIClient.storage.getStorageByName(name)
let storageNode: IStorageNode = new StorageNode(storageDetail)
```

**ToDo: change to new API document**

The `storageNodeName` is the unique name for each storage node. Currently it is combined by the name of storage config (`storageConfigName`) and the mount point specified in it (`mountPoint`). The storage config could be queried by by the [get storage config API](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/microsoft/pai/master/src/rest-server/docs/swagger.yaml#operation/getStorageConfigs), the response of which looks like below (more details about storage configuration refer to [here](https://github.com/microsoft/pai/tree/master/contrib/storage_plugin#config-data-structure-))

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
***Note that the storage config API is under changing, this doc will be updated when it is fixed***

## Access the storage

The `IStorageNode` object provides essential methods to access the storage, such as query, copy and remove. 

- get status of a path

  ```ts
  let stat: IFileInfo = await storageNode.getinfo(path);
  let flagExists: bool = storageNode.existsSync(path);
  let flagIsFolder: bool = storageNode.isdirSync(path);
  ``` 

- list directory of a path
  ```ts
  let items: string[] = await storageNode.listdir(path)
  ```

- delete (remove) a path
  ```ts
  await stoageNode.delete(path)
  await stoageNode.deleteFolder(path)
  ```

- create a directory
  ```ts
  await storageNode.makedir(path)
  ```

- copy from local file (upload)
  ```ts
  await storageNode.upload(localPath, path)
  await storageNode.uploadFolder(localPath, path)
  ```

- copy to local file (download)
  ```ts
  await storageNode.download(path, localPath)
  await storageNode.downloadFolder(path, localPath)
  ```

- [TBD] open read or write file stream

## CLI interface

The users of CLI could be able to access the storage configs provisioned by the cluster like below
```bash
pai getinfo -a ${cluster} -s ${storageNodeName} path
pai listdir -a ${cluster} -s ${storageNodeName} path
pai makedir -a ${cluster} -s ${storageNodeName} path
pai delete -a ${cluster} -s ${storageNodeName} path
pai upload -a ${cluster} -s ${storageNodeName} localPath path
pai download -a ${cluster} -s ${storageNodeName} path localPath

```
Here, `${cluster}` is the cluster alias that could be indexed in local environment.
