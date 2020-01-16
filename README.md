# Motivation

This SDK is designed to facilitate the developers of [OpenPAI](https://github.com/microsoft/pai) by providing below functions

- RESTful API Wrapping
- Cluster Management in local environment
- Unified Storage Interface
- Front End Support
- Job Config Processing

# Cluster Management in local environment

To let users easily access multiple clusters, the SDK records the necessary configuration of each cluster in a local file (e.g. `~/.openpai/clusters.yaml`). In the file, a list of clusters are stored, and each of them has a alias (`${cluster-alias}`) to be addressed. 

To accelerate cluster loading, the SDK may also cache some not-frequently-changed cluster information (e.g. virtual clusters, storages). And the updating method is also provided to synchronize with cluster.

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
