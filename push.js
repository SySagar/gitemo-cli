#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";
import chalkAnimation from "chalk-animation";

var selectedRemote ="";
const remoteUrlArr = [];

var selectedBranch ="";
var branchName ="";
const branchArr = [];

const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms));
let commitMsg = "done something";


async function pushCode() {


    shell.exec('git remote -v').stdout.split('\n').forEach(function (remoteUrl) {

        if(remoteUrl.includes('\thttps://github.com/')){
            remoteUrl = remoteUrl.replace('\thttps://github.com/','--------');
            
        }
        remoteUrlArr.push(remoteUrl);
    });

    remoteUrlArr.pop();

    var remoteName = remoteUrlArr[0].split('--------')[0];

    const listRemotes = await inquirer.prompt({
        name: "options",
        type: "list",
        message: "Select remote :\n",
        choices: remoteUrlArr
      });

      selectedRemote = listRemotes.options


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
        message: "Select branch to be pushed:\n",
        choices: branchArr
      });

      selectedBranch = listBranch.options
      selectedBranch = selectedBranch.replace('* ', chalk.green('*'));

      shell.exec(`git push ${remoteName} ${selectedBranch}`);
    console.clear();


  const rainbowTitle = chalkAnimation.rainbow("✈️ Pushing code....\n");

  await sleep();
  rainbowTitle.stop();

  console.log(chalk.bgBlueBright.bold(`✅ Succesfully pused to ${selectedRemote} ${selectedBranch}`));

}


pushCode()