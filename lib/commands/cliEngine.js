"use strict";
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
const argparse = require("argparse");
const util_1 = require("../commom/util");
class CliEngine {
    constructor(clusterFile) {
        if (clusterFile) {
            this.clusterConfigFile = clusterFile;
        }
        this.parser = new argparse.ArgumentParser({
            version: '0.1',
            addHelp: true,
            description: 'command line tool for OpenPAI (github.com/microsoft/pai)'
        });
        this.subparsers = this.parser.addSubparsers({ title: 'commands', dest: 'subcommand' });
    }
    registerCommand(subCommand, args, cb, exclusiveArgs) {
        const addArgument = (ps, a) => {
            let name = a.name;
            delete a.name;
            ps.addArgument(name, a);
        };
        let cmd = subCommand.name;
        delete subCommand.name;
        if (subCommand.addHelp == null) { // null or undefined
            subCommand.addHelp = true;
        }
        let parser = this.subparsers.addParser(cmd, subCommand);
        for (const arg of args) {
            addArgument(parser, arg);
        }
        if (exclusiveArgs) {
            for (const g of exclusiveArgs) {
                let group = parser.addMutuallyExclusiveGroup({ required: g.required || false });
                for (const arg of g.args) {
                    addArgument(group, arg);
                }
            }
        }
        CliEngine.prototype[cmd] = cb;
    }
    execute() {
        let args = this.parser.parseArgs();
        let cmd = args.subcommand;
        delete args.subcommand;
        try {
            (async () => {
                util_1.Util.debug(cmd, args);
                let result = await Promise.resolve(this[cmd](args));
                util_1.Util.debug('results received', result);
                if (result != null) {
                    console.dir(result);
                }
                else {
                    console.log();
                }
            })();
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.CliEngine = CliEngine;
