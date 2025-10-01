import fs from "fs-extra";
import path from "node:path";

export async function copyFilesAndFolders(templateDir, targetDir, isSrc) {
  try {
    const destination = isSrc ? path.join(targetDir, "src") : targetDir;
    await fs.copy(templateDir, destination);
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
    console.log("Success");
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

// import fs from "node:fs";
// import path from "node:path";

// export default function copyTemplateFiles(templateDir, targetDir) {
//   if (!fs.existsSync(templateDir)) {
//     throw new Error(`Template directory not found: ${templateDir}`);
//   }

//   const entries = fs.readdirSync(templateDir, { withFileTypes: true });

//   for (const entry of entries) {
//     const srcPath = path.join(templateDir, entry.name);
//     const destPath = path.join(targetDir, entry.name);

//     if (entry.isDirectory()) {
//       fs.mkdirSync(destPath, { recursive: true });
//       copyTemplateFiles(srcPath, destPath); // recurse
//     } else {
//       fs.copyFileSync(srcPath, destPath);
//       console.log(`📄 Copied: ${path.relative(process.cwd(), destPath)}`);
//     }
//   }
// }
