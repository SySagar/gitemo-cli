#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";
import chalkAnimation from "chalk-animation";

async function sleep(ms = 1500) {
  return new Promise((r) => setTimeout(r, ms));
}

var branchName ="";

async function newBranch() {
    const newBranch = await inquirer.prompt({
        name: "message",
        type: "input",
        message: "Name your branch :\n",
        default() {
          return "dev";
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