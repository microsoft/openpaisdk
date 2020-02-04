# OpenPAI JS SDK

The `JavaScript` SDK is designed to facilitate the developers of [OpenPAI](https://github.com/microsoft/pai) to offer user friendly experience. 

The SDK mainly provides client side sharable functions such as RESTful API wrapping, error handling, storage accessing and processing of [job protocol](). 

It could be used to support existing or future front-ends (e.g. Web Portal, VS Code extension, Command Line Interface, Jupyter Notebook extension, and 3rd party clients), and also could be used to simplify the design of [kube runtime plugins](), which are executed in init containers.

*Now we are porting some of the functions from existing `Python` [SDK](github.com/microsoft/pai/contrib/python-sdk) and command line tool. The whole functionality of this SDK will be ready soon.*

## Installation

```bash
npm install --save microsoft/openpaisdk
```

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

### Installation of CLI tool

The SDK offers a command line interface (CLI) prefixed by `pai`. For end users that use CLI only, we provide an easy way to install it via `pip` and the `Python` package `nodeenv`. 

```bash
pip install nodeenv
nodeenv myenv
myenv/Scripts/activate
npm i -g microsoft/openpaisdk
```

This installation commands will generate a virtual environment with latest `node` in the directory `./myenv`, and install the CLI in it. Then user could use `pai` command by any of below methods

- activate the virtual environment first
    ```bash
    myenv/Scripts/activate
    pai -h
    ```
- use a absolute path to `pai`
    ```bash
    myenv/Scripts/pai -h
    ```
- add `myenv/Scripts` to environment variable `path`


## RESTful API
The SDK provides ease-of-use `JavaScript` and `TypeScript` wrapping of  [OpenPAI RESTful APIs](https://github.com/microsoft/pai/blob/master/docs/rest-server/API.md). 

Details are in [rest-api.md](docs/rest-api.md).

## Storage Operations

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

The users of CLI could be able to access the storage configs provisioned by the cluster like below
```bash
pai getinfo ${cluster-alias} ${storageconfig} ${mountpoint} remotePath
```

Details are in [storage.md](docs/storage.md).

## Local Cluster Management

In some scenarios (e.g. cli or notebook extension), it is required to store the cluster information locally.

## Unified error handling

The SDK will center the error handling, thus all front ends depending on it could share the same way to warn users.

## Common job config processing

The interoperation of `OpenPAI` components depends on the [job protocol](github.com/microsoft/openpaiprotocol), and there have been some common operations of it, such as validation, preprocessing before submission (e.g. embedding essential user information). The SDK will provide essential common operations for all the front ends.

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
