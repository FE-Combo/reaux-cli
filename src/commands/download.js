const axios = require("axios");
const fs = require("fs-extra");
const chalk = require("chalk");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

async function downloadFile(sourceUrl, destinationPath) {
  const response = await axios.get(sourceUrl, { responseType: "arraybuffer" });
  const fileBuffer = Buffer.from(response.data, "binary");
  await writeFile(destinationPath, fileBuffer);
  console.info(`File ${chalk.green(sourceUrl)} downloaded successfully to ${chalk.green(destinationPath)}`);
}

module.exports = {
  downloadFile,
};
