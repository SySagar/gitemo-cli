#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";
import chalkAnimation from "chalk-animation";

async function sleep(ms = 1500) {
  return new Promise((r) => setTimeout(r, ms));
}

var branchName ="";
var branchArr = [];
var selectedBranch ="";

async function deleteBranch() {


      shell.exec('git branch --list').stdout.split('\n').forEach(function (branch) {
        if (branch.includes(' ')) {
            branchName = branch.replace('* ', chalk.green('*'));
            branchName = branchName.replace('  ', '');
        }
        branchArr.push(branchName);
    });

    branchArr.pop();

    const listBranch = await inquirer.prompt({
      name: "options",
      type: "list",
      message: "Select branch :\n",
      choices: branchArr
    });

    selectedBranch = listBranch.options

    const rainbowTitle = chalkAnimation.rainbow("Deleting...");
    await sleep();
    rainbowTitle.stop();
    console.clear();
    
    shell.exec(`git branch -D ${selectedBranch}`);
    console.log(chalk.bgRed.bold(`🪓 Deleted ${selectedBranch} `));
}

deleteBranch()