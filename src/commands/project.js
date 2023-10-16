// init project
const fs = require("fs-extra");
const chalk = require("chalk");
const downloadGitRepo = require("download-git-repo");
const { booleanPrompt, selectPrompt } = require("../kit");

const repos = {
  "reaux-dom": "https://github.com/FE-Combo/reaux-dom-demo-project.git",
};

const getRepoName = (name) => name + "-demo-project";

function create(type, name) {
  const targetProjectPath = `./${name}`;
  if (fs.pathExistsSync(targetProjectPath)) {
    throw new Error("The current project already exists");
  }
  downloadGitRepo(`direct:${repos[type]}`, name, { clone: true }, function (err) {
    if (err) {
      throw err;
    }
    const packagePath = `./${name}/package.json`;
    const package = fs
      .readFileSync(packagePath)
      .toString()
      .replace(new RegExp(getRepoName(type), "g"), name);
    fs.writeFileSync(packagePath, package);
  });
  console.info(chalk.green("Init Project successfully"));
}

async function init(name, cmd) {
  if (cmd.type) {
    if (!Object.keys(repos).includes(cmd.type)) {
      throw new Error(`Invalid type, please check the ${chalk.red("--type")} parameter, or use ${chalk.red("rc init --help")} to view the help of the ${chalk.red("--type")} parameter`);
    }
    create(cmd.type, name);
  } else {
    const selectResponse = await selectPrompt({
      name: "type",
      message: "select project type:",
      choices: Object.keys(repos),
    });

    const response = await booleanPrompt({
      message: `Would you like to create a new project in the directory ${chalk.red(`${process.cwd()}/`)} with the project name ${chalk.red(name)} and project type ${chalk.red(selectResponse.type)}[${chalk.red(repos[selectResponse.type])}]?`,
      name: "ifCreate",
    });
    if (response.ifCreate) {
      create(selectResponse.type, name);
    }
  }
}

module.exports = {
  init,
};
