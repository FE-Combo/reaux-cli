const process = require("process");
const chalk = require("chalk");
const shelljs = require("shelljs");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const path = require("path");
const childProcess = require("child_process");

const errorIntercept = async (fn) => {
  try {
    await fn();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const copyDir = (source, target, callback) => {
  shelljs.ls(source).forEach((name) => {
    const subSource = `${source}/${name}`;
    const subTarget = `${target}/${name}`;
    const isFile = fs.statSync(subSource).isFile();
    if (isFile) {
      fs.ensureFileSync(subTarget);
      let fileContent = fs.readFileSync(subSource).toString();
      if (typeof callback === "function") {
        fileContent = callback(fileContent);
      }
      fs.writeFileSync(subTarget, fileContent);
    } else {
      fs.ensureDirSync(subTarget);
      copyDir(subSource, subTarget);
    }
  });
};

const string2Camel = (str) => str.replace(/([^\\/])(?:\/+([^\\/]))/g, (_, p1, p2) => p1 + p2.toUpperCase());

const stringFirstUpperCase = (str) => {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};

const convertToCamelCase = (str) => {
  // 首字母大写，并将 "-" 后面的第一个字母转换为大写
  return str.replace(/-(.)/g, (_, match) => match.toUpperCase());
};

const inputPrompt = async (options) => {
  return await inquirer.prompt([
    {
      type: "input",
      ...options,
    },
  ]);
};

const booleanPrompt = async (options) => {
  return await inquirer.prompt([
    {
      type: "confirm",
      ...options,
    },
  ]);
};

const selectPrompt = async (options) =>
  inquirer.prompt([
    {
      type: "list",
      ...options,
    },
  ]);

function spawn(command, params) {
  const isWindows = process.platform === "win32";
  const result = childProcess.spawnSync(isWindows ? command + ".cmd" : command, params, {
    stdio: "inherit",
  });
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`non-zero exit code returned, code=${result.status}, command=${command} ${params.join(" ")}`);
    process.exit(1);
  }
}

function format(prettierPath) {
  const prettierConfigPath = path.join(process.cwd(), "/prettier.config.js");
  if (prettierPath && fs.pathExistsSync(prettierConfigPath)) {
    spawn("npx", ["prettier", "--config", prettierConfigPath, "--write", prettierPath]);
  }
}

function isValidVariableName(variableName) {
  // 使用正则表达式来检查变量名
  const regex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return regex.test(variableName);
}

module.exports = {
  errorIntercept,
  copyDir,
  string2Camel,
  inputPrompt,
  stringFirstUpperCase,
  booleanPrompt,
  convertToCamelCase,
  selectPrompt,
  spawn,
  format,
  isValidVariableName,
};
