#!/usr/bin/env node

const process = require("process");
const commander = require("commander");
const pkgInfo = require("../package.json");

commander.version(pkgInfo.version);
commander
  .command("start").action(async function () {
      require("./start")
  });

  commander
  .command("build").action(async function () {
      require("./build")
  });


  commander.parse(process.argv);