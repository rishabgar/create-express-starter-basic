#!/usr/bin/env node

import path from "node:path";
import fs from "fs";
import inquirer from "inquirer";
import { exec } from "node:child_process";
import copyTemplateFiles from "../lib/copyTemplateFiles.js";

function createFolders(basePath, folders) {
  folders.forEach((folder) => {
    const fullPath = path.join(basePath, folder);
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Created folder: ${folder}`);
  });
}

function getLatestExpressVersion() {
  return new Promise((resolve, reject) => {
    exec("npm view express version", (err, stdout) => {
      if (err) {
        console.error("❌ Failed to fetch express version");
        reject(err);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

const appName = process.argv[2] || "my-express-app";
const projectPath = path.join(process.cwd(), appName);

if (fs.existsSync(projectPath)) {
  console.error(`❌ Folder "${appName}" already exists.`);
  process.exit(1);
}

async function init() {
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Which language do you want to use?",
      choices: ["JavaScript", "TypeScript"],
    },
  ]);

  const expressVersion = await getLatestExpressVersion();

  fs.mkdirSync(projectPath);
  console.log(`📁 Created project folder: ${appName}`);

  // Create folders (src, routes, etc.)
  const folders = ["src", "src/routes", "src/controllers", "src/middleware"];
  createFolders(projectPath, folders);

  // Copy template files
  const templateBase = path.join(
    __dirname,
    "../templates",
    language === "JavaScript" ? "js" : "ts"
  );
  const targetSrc = path.join(projectPath, "src");
  copyTemplateFiles(templateBase, targetSrc);

  // Write package.json
  const isTS = language === "TypeScript";
  const ext = isTS ? "ts" : "js";

  const pkg = {
    name: appName,
    version: "1.0.0",
    main: `src/index.${ext}`,
    scripts: {
      start: isTS ? `ts-node src/index.ts` : `node src/index.js`,
    },
    dependencies: {
      express: `^${expressVersion}`,
    },
    ...(isTS && {
      devDependencies: {
        typescript: "^5.0.0",
        "ts-node": "^10.0.0",
        "@types/express": "^4.17.17",
      },
    }),
  };

  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkg, null, 2)
  );

  // Copy tsconfig if TypeScript
  if (isTS) {
    fs.copyFileSync(
      path.join(__dirname, "../templates/ts/tsconfig.json"),
      path.join(projectPath, "tsconfig.json")
    );
  }

  console.log(`\n🎉 Project ready at ${appName}`);
  console.log(`➡️ Next steps:\n  cd ${appName}\n  npm install\n  npm start`);
}

init();
