import * as fs from "fs";
import * as path from 'path';
import { exec } from "child_process";

const folderToWatch = "../content";

function runCmd(command: string) {
  const parentFolder = path.resolve(process.cwd(), '..');
  const options = { cwd: parentFolder };

  exec(command, options, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  });
}

fs.watch(folderToWatch, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`File ${filename} changed. Running "npm run build"...`);
    runCmd("npm run build");
  } else {
    console.error("Filename not provided. Unable to run the command.");
  }
});

console.log(`Watching for changes in ${folderToWatch}...`);
