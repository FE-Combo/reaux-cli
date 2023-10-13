#!/usr/bin/env node
"use strict";

const process = require("process");
const commander = require("commander");
const { init } = require("./commands/project");
const { add } = require("./commands/module");
const { update } = require("./commands/state");
const { add: addComp } = require("./commands/component");
const { downloadFile } = require("./commands/download");
const { errorIntercept } = require("./kit");
const pkgInfo = require("../package.json");

commander.version(pkgInfo.version);

commander
  .command("init <projectName>")
  .option("--type [type]", "Specify the project type")
  .description("Create a new project quickly")
  .action((name, cmd) => {
    errorIntercept(async function () {
      await init(name, cmd);
    });
  });

commander
  .command("module <modulePath>")
  .description("Create a new module quickly")
  .action(async function (modulePath) {
    errorIntercept(async function () {
      await add(modulePath);
      await update();
    });
  });

commander
  .command("comp <componentName>")
  .description("Create a new component quickly")
  .action((componentName) => {
    errorIntercept(async function () {
      await addComp(componentName);
    });
  });

commander
  .command("state")
  .description("Update the application state")
  .action(() => {
    errorIntercept(async function () {
      await update();
    });
  });

commander
  .command("download <sourceUrl> <destinationPath>")
  .description("Download a file from the server")
  .action((sourceUrl, destinationPath) => {
    errorIntercept(async function () {
      await downloadFile(sourceUrl, destinationPath);
    });
  });

commander.parse(process.argv);
