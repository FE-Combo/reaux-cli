// create component
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const { copyDir, stringFirstUpperCase, format, convertToCamelCase, isValidVariableName } = require("../kit");

async function add(componentName, destinationPath = "src/components") {
  if (!isValidVariableName(componentName)) {
    throw new Error(`${chalk.red("Invalid component name.")} Component names must start with a letter, underscore (_), or dollar sign ($) and can only contain letters, numbers, underscores, and dollar signs.`);
  }
  const frame = require(path.join(process.cwd(), "/package.json"))?.frame || "reaux-dom";
  const componentSourcePath = path.resolve(__dirname, `../../templates/${frame}/component`);
  const componentTargetPath = path.join(process.cwd(), destinationPath, convertToCamelCase(stringFirstUpperCase(componentName)));

  const projectPkgIfExist = fs.pathExistsSync(path.join(process.cwd(), "/package.json"));

  if (projectPkgIfExist) {
    if (fs.pathExistsSync(componentTargetPath)) {
      throw new Error("The current component already exists");
    }
  } else {
    throw new Error("The current shell path is not in the root directory of the project");
  }

  fs.ensureDirSync(componentTargetPath);
  copyDir(componentSourcePath, componentTargetPath, function (fileContent) {
    return fileContent;
  });

  format(componentTargetPath + "/*");

  console.info(chalk.green("Create component successfully"));
}

module.exports = {
  add,
};
