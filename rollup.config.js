import { defineConfig } from "rollup";

export default defineConfig({
  input: "index.js",
  output: {
    dir: "dist",
    format: "es",
    name: "create-express-starter",
    banner: "#!/usr/bin/env node",
  },
  external: [
    "degit",
    "fs-extra",
    "inquirer",
    "node:path",
    "node:child_process",
    "util",
    "url",
  ],
});
