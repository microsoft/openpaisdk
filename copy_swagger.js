var exec = require('child_process').exec;
var os = require('os');

function puts(error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
    console.error(stderr);
    console.log(stdout);
}

if (os.type() === 'Linux')
   exec("cp src/api/v2/swagger.yaml lib/src/api/v2/swagger.yaml", puts);
else if (os.type() === 'Darwin')
   exec("cp src/api/v2/swagger.yaml lib/src/api/v2/swagger.yaml", puts);
else if (os.type() === 'Windows_NT')
   exec("copy src\\api\\v2\\swagger.yaml lib\\src\\api\\v2\\swagger.yaml", puts);
else
   throw new Error("Unsupported OS found: " + os.type());
