#!/usr/bin/env node

import path from "node:path";
import inquirer from "inquirer";
import { exec } from "node:child_process";
import {
  checkExistingPath,
  copyFilesAndFolders,
  writeFile,
} from "./lib/FilesOperation.js";
import { promisify } from "util";

const execAsync = promisify(exec);

async function getLatestVersion(pacakageName) {
  try {
    const { stdout } = await execAsync(`npm view ${pacakageName} version`);
    return stdout.trim();
  } catch (err) {
    console.error("❌ Failed to fetch express version");
    process.exit(1);
  }
}

const appName = process.argv[2] || "my-express-app";
const projectPath = path.join(process.cwd(), appName);

await checkExistingPath(projectPath, appName);

async function init() {
  const { isSrc } = await inquirer.prompt([
    {
      type: "list",
      name: "isSrc",
      message: "Do you want src folder?",
      choices: [true, false],
    },
  ]);

  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Which Language Do You Want To Use?",
      choices: ["JavaScript", "TypeScript"],
    },
  ]);

  const isTs = language === "TypeScript" ? true : false;

  const templateDir = path.join("./", "templates", `${language}`);

  const expressVersion = await getLatestVersion("express");
  const nodemonVersion = await getLatestVersion("nodemon");

  await copyFilesAndFolders(templateDir, projectPath, isSrc);

  const ext = isTs ? ".ts" : ".js";

  const packageJson = {
    name: appName,
    version: "1.0.0",
    type: "module",
    main: isSrc ? `src/server${ext}` : `./server${ext}`,
    scripts: {
      start: isSrc ? `node src/server${ext}` : `node ./server${ext}`,
      watch: isSrc ? `nodemon src/server${ext}` : `node ./server${ext}`,
      ...(isTs && { build: "tsc" }),
    },
    dependencies: {
      express: `^${expressVersion}`,
    },
    devDependencies: {
      nodemon: nodemonVersion,
      ...(isTs && {
        "@types/express": "^5.0.1",
        "ts-node": "^10.9.2",
        typescript: "^5.8.3",
      }),
    },
  };

  await writeFile(path.join(projectPath, "package.json"), packageJson);
}

init();
