import { defineConfig } from "rollup";
import copy from "rollup-plugin-copy";

export default defineConfig({
  input: "index.js",
  output: {
    dir: "dist",
    format: "es",
    name: "create-express-starter",
    banner: "#!/usr/bin/env node",
  },
  external: [
    "fs-extra",
    "inquirer",
    "node:path",
    "node:child_process",
    "util",
    "url",
  ],
  plugins: [
    copy({
      targets: [{ src: "templates", dest: "dist" }],
      hook: "buildEnd",
    }),
  ],
});
