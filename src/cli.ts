#!/usr/bin/env node
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

// tslint:disable-next-line:missing-jsdoc
import * as argparse from 'argparse';

interface IArgOpt {
    name: string | string[];
    options: argparse.ArgumentOptions;
}

class CLI {
    public parser: argparse.ArgumentParser;
    public subparsers: argparse.SubParser;
    public executors: { [index: string]: () => {}; };
    constructor() {
        this.parser = new argparse.ArgumentParser({
            version: '0.1',
            addHelp: true,
            description: 'command line tool for OpenPAI (github.com/microsoft/pai)'
        });
        this.subparsers = this.parser.addSubparsers({ title: 'subcommands' });
        this.executors = {};
    }

    public registerCommand(subCommand: string, args: IArgOpt[], func: () => {}): void {
        let parser = this.subparsers.addParser(subCommand, { addHelp: true });
        for (const a of args) {
            parser.addArgument(a.name, a.options);
        }
        this.executors[subCommand] = func;
    }
}

let cli = new CLI();

cli.registerCommand(
    'list-cluster', [], async () => {

    }
);
