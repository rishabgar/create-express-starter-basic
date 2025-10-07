import degit from "degit";

const emitter = degit("rishabgar/templates/templates/express/module", {
  cache: false,
  force: true,
  verbose: true,
});

emitter.clone("./templates").then(() => {
  console.log("done");
});
