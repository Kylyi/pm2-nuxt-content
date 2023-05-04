"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
var folderToWatch = "../content";
function runCmd(command) {
    var parentFolder = path.resolve(process.cwd(), '..');
    var options = { cwd: parentFolder };
    (0, child_process_1.exec)(command, options, function (error, stdout, stderr) {
        if (error) {
            console.error("Error executing command: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.error("Error: ".concat(stderr));
            return;
        }
        console.log("Output: ".concat(stdout));
    });
}
fs.watch(folderToWatch, { recursive: true }, function (eventType, filename) {
    if (filename) {
        console.log("File ".concat(filename, " changed. Running \"yarn build\"..."));
        runCmd("yarn generate");
    }
    else {
        console.error("Filename not provided. Unable to run the command.");
    }
});
console.log("Watching for changes in ".concat(folderToWatch, "..."));
