#!/usr/bin/env node

import inquirer from 'inquirer';
import emoij from './emoji.json' assert {type: 'json'};
import cliSpinners from "cli-spinners";
import { createSpinner } from 'nanospinner';
import chalkAnimation from 'chalk-animation';
import {exec} from 'child_process'
import shell from 'shelljs'
import { exit } from 'process';

const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms));
let commitMsg = "done something";

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Ready to push the code?\n'
      );

      await sleep();
      rainbowTitle.stop();
      
}

let messageType="";
let messageEmoji="";
async function defTypes(type) {
    if(type===emoij.feature.task) {
        messageType = emoij.feature.type;
        messageEmoji = emoij.feature.emoji;
    }
    else
    if(type===emoij.build.task) {
        messageType = emoij.build.type;
        messageEmoji = emoij.build.emoji;
    }
    else    
    if(type===emoij.fix.task) {
        messageType = emoij.fix.type;
        messageEmoji = emoij.fix.emoji;
    }
    else
    if(type===emoij.chore.task) {
        messageType = emoij.chore.type;
        messageEmoji = emoij.chore.emoji;
    }
    else
    if(type===emoij.refactor.task) {
        messageType = emoij.refactor.type;
        messageEmoji = emoij.refactor.emoji;
    }
    else
    if(type===emoij.remove.task) {
        messageType = emoij.remove.type;
        messageEmoji = emoij.remove.emoji;
    }
    else {
        console.log("Invalid option selected");
    }
}

async function options() {
    const opts = await inquirer.prompt({
      name: 'options',
      type: 'list',
      message: 'Select any of the follwing task you have done in the codebase :\n',
      choices: [
          emoij.feature.task,
          emoij.build.task,
          emoij.fix.task,
          emoij.chore.task,
          emoij.refactor.task,
          emoij.remove.task
      ],
    });


    defTypes(opts.options);
}

async function run(){

    //  exec.execSync(`
    //  #! /usr/bin/bash
    //   git add .
    // git commit -m "${messageEmoji} ${messageType} : ${commitMsg}"
    // `, {stdio: 'inherit'}, (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    // });

    // shell.exec(`git commit -m "${messageEmoji} ${messageType} : ${commitMsg}"
    // `);

    console.log(shell.pwd().toString())

    

    // try {
    //     exec(`git add . && git commit -m "${messageEmoji} ${messageType} : ${commitMsg}"`,{ cwd: shell.pwd().toString() });
    //     console.log('Git commit successful.');
    //   } catch (error) {
    //     console.error(`Git commit error: ${error}`);
    //   }

    if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
      }

    // if (shell.exec(`git commit -m "${messageEmoji} ${messageType} : ${commitMsg}"`).code !== 0) {
    //     console.log('Error: Git commit failed');
    //     exit(1);
    //   }
    console.log(messageEmoji+" "+messageType+" : "+commitMsg);
    return Promise.resolve("Success");
}

async function commit() {

    const spinner = createSpinner('commiting the code...\n\n\n').start();
    await sleep();
    console.clear();

   
    run().then(() => {
        console.log('done')
        process.exit(0);
    });
}

async function commitMessage() {
 
    const commitMessageWithTypes = await inquirer.prompt({
        name: 'message',
        type: 'input',
        message: 'Type your commit message here :\n',
        default() {
          return 'done something';
        },
      });
      console.clear();
      commitMsg = commitMessageWithTypes.message

}

console.clear();
await welcome();
await options();
await commitMessage();
await commit();