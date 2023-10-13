// add module
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const { copyDir, string2Camel, format, convertToCamelCase } = require("../kit");

async function add(modulePath) {
  if (modulePath.split("/").length > 2) {
    throw new Error("Module supports up to two levels");
  }

  const frame = require(path.join(process.cwd(), "/package.json"))?.frame || "reaux-dom";
  const projectPkgIfExist = fs.pathExistsSync(path.join(process.cwd(), "/package.json"));
  const moduleSourcePath = path.resolve(__dirname, `../../templates/${frame}/module`);
  const moduleTargetPath = path.join(process.cwd(), "src/modules", modulePath);

  if (projectPkgIfExist) {
    if (fs.pathExistsSync(moduleTargetPath)) {
      throw new Error("The current module already exists");
    }

    fs.ensureDirSync(moduleTargetPath);
    copyDir(moduleSourcePath, moduleTargetPath, function (fileContent) {
      /**
       * e.g
       * login => login
       * account/order => accountOrder
       */
      return fileContent.replace("{namespace}", convertToCamelCase(string2Camel(modulePath))).replace("{frame}", frame);
    });

    format(moduleTargetPath + "/*");

    console.info(chalk.green("Add module successfully"));
  } else {
    throw new Error("The current shell path is not in the root directory of the project");
  }
}

module.exports = {
  add,
};
