import path from "node:path";
import inquirer from "inquirer";
import { exec } from "node:child_process";
import degit from "degit";
import { checkExistingPath, writeFile } from "./lib/FilesOperation.js";
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
  let language = "JavaScript";
  const { isSrc } = await inquirer.prompt([
    {
      type: "list",
      name: "isSrc",
      message: "Do you want src folder?",
      choices: [true, false],
    },
  ]);

  const { moduleType } = await inquirer.prompt([
    {
      type: "list",
      name: "moduleType",
      message: "Do you want commonjs or module",
      choices: ["Module", "CommonJs"],
    },
  ]);

  if (moduleType === "Module") {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: "Which Language Do You Want To Use?",
        choices: ["JavaScript", "TypeScript"],
      },
    ]);

    language = answer.language;
  }

  const destination = isSrc ? `./${appName}/src` : `./${appName}`;
  const moduleTypeLowerCase = moduleType.toLowerCase();

  const emitter = degit(
    `rishabgar/templates/templates/express/${moduleTypeLowerCase}/${language}`,
    {
      cache: false,
      force: true,
      verbose: true,
    }
  );

  await emitter.clone(destination);

  const isTs = language === "TypeScript" ? true : false;

  const expressVersion = await getLatestVersion("express");
  const nodemonVersion = await getLatestVersion("nodemon");

  const ext = isTs ? ".ts" : ".js";

  const packageJson = {
    name: appName,
    version: "1.0.0",
    type: moduleTypeLowerCase === "module" ? "module" : "commonjs",
    main: isSrc ? `src/server${ext}` : `./server${ext}`,
    scripts: {
      start: isSrc ? `node src/server${ext}` : `node ./server${ext}`,
      watch: isTs
        ? "nodemon --exec ts-node ./src/server.ts"
        : isSrc
        ? `nodemon src/server${ext}`
        : `node ./server${ext}`,
      ...(isTs && {
        build: "tsc",
      }),
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

  console.log(`
    cd ${appName}
    npm install
    npm run watch
    `);
}

init();
