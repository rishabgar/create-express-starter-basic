import fs from "fs-extra";
import path from "node:path";

export async function copyFilesAndFolders(templateDir, targetDir, isSrc) {
  try {
    const destination = isSrc ? path.join(targetDir, "src") : targetDir;
    await fs.copy(templateDir, destination, {
      filter: (src) => !src.endsWith("tsconfig.json"),
    });
    console.log("success!");
    return;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export async function writeFile(targetPath, data) {
  try {
    await fs.writeFile(targetPath, JSON.stringify(data, null, 2), "utf8");
    return;
  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
}

export async function checkExistingPath(projectPath, appName) {
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Project "${appName}" already exists.`);
    process.exit(1);
  }
  return;
}
