#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";

var selectedBranch ="";
var branchName ="";
const branchArr = [];
async function changeBranch() {

    shell.exec('git branch --list').stdout.split('\n').forEach(function (branch) {
        if (branch.includes(' ')) {
            branchName = branch.replace('* ', chalk.green('*'));
            branchName = branchName.replace('  ', '');
        }
        branchArr.push(branchName);
    });

    branchArr.pop();
    //console.log(branchArr);

    const listBranch = await inquirer.prompt({
        name: "options",
        type: "list",
        message: "Select branch :\n",
        choices: branchArr
      });

      selectedBranch = listBranch.options
      selectedBranch = selectedBranch.replace('* ', chalk.green('*'));
    shell.exec(`git checkout ${selectedBranch}`);
    console.clear();
  console.log(chalk.bgBlueBright.bold(`📌 Switched to ${selectedBranch} `));

}


changeBranch()