# Unified Storage Interface

Multiple types of storages are supported by OpenPAI, however, the end user and developers should not be bothered by too much details of it. The SDK provides an abstract storage accessing methods to let users access the storages.

For the cluster (client) object in SDK, it would provide path parsing and storage accessing methods (`list, getinfo, upload, download, delete`) with the following type of path
```bash
${configname}~${mount-index}/path/to/destination
``` 

The `${configname}` and `${mount-index}` could be found in the the retrieved [storage config](https://github.com/microsoft/pai/tree/master/contrib/storage_plugin#config-data-structure-) by the [get storage config API](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/microsoft/pai/master/src/rest-server/docs/swagger.yaml#operation/getStorageConfigs), which contains a list of storage paths like 
```json
{
	"name": "configname",
	"mountInfos": [
	    {
	        "server": "servername",
	        "path": "server/sub/path"
	    },
	]
}
```

For end user, the SDK / Front End could be able to translate the path like 
```bash
pai://${cluster-alias}/${configname}~${mount-index}/path/to/destination
```
to the real remote path in the storage configs provisioned by the cluster. Here, `${cluster-alias}` is the cluster alias that could be indexed in local environment.