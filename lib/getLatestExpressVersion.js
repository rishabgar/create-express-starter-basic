const { exec } = require("child_process");

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

module.exports = { getLatestExpressVersion };
