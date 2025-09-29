import fs from "node:fs";
import path from "node:path";

export default function copyTemplateFiles(templateDir, targetDir) {
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  const entries = fs.readdirSync(templateDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(templateDir, entry.name);
    const destPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyTemplateFiles(srcPath, destPath); // recurse
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📄 Copied: ${path.relative(process.cwd(), destPath)}`);
    }
  }
}
