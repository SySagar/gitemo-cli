#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";
import chalkAnimation from "chalk-animation";

async function sleep(ms = 1500) {
  return new Promise((r) => setTimeout(r, ms));
}

var remote ="";
var branchName ="";

async function pull() {
    const repoName = await inquirer.prompt({
        name: "message",
        type: "input",
        message: "Name your remote :\n",
        default() {
          return "origin";
        },
      });

      const branch = await inquirer.prompt({
        name: "message",
        type: "input",
        message: "Name your branchname :\n",
        default() {
          return "main";
        },
      });

      branchName = newBranch.message

}


async function colorName() {
  const rainbowTitle = chalkAnimation.rainbow("Creating...");
  await sleep();
  rainbowTitle.stop();
  shell.exec(`git stash && git checkout -b ${branchName} && git stash pop`);
  console.clear();
  console.log(chalk.bgGreen.bold(`🌿 Created ${branchName} `));
  process.exit(0);

}

newBranch().then(() => {
colorName();
});