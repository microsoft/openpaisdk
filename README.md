# OpenPAI JS SDK

The `JavaScript` SDK is designed to facilitate the developers of [OpenPAI](https://github.com/microsoft/pai) to offer user friendly experience. 

The SDK mainly provides client side sharable functions such as RESTful API wrapping, error handling, storage accessing and processing of [job protocol](). 

It could be used to support existing or future front-ends (e.g. Web Portal, VS Code extension, Command Line Interface, Jupyter Notebook extension), and also could be used to simplify the design of [kube runtime plugins](), which are executed in init containers.

## Installation

```bash
npm install --save microsoft/pai#openpai-js-sdk
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

## Installation of CLI tool

```bash
pip install nodeenv
nodeenv myenv
myenv/Scripts/activate
npm i -g microsoft/pai#openpai-js-sdk
pai -h
myenv/Scripts/pai -h
```

## RESTful API
The SDK provides ease-of-use `JavaScript` and `TypeScript` wrapping of `OpenPAI` [RESTful APIs](https://github.com/microsoft/pai/blob/master/docs/rest-server/API.md). 

Details are in [rest-api.md](docs/rest-api.md).

## Unified Storage Interface

Details are in [storage.md](docs/storage.md).

## Local Cluster Management

In some scenarios (e.g. cli or notebook extension), it is required to store the cluster information locally.

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
