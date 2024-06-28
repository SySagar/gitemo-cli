import { aiResponse } from './aiResponse';
import prompt from './prompt';
import withClient from '@commands/commit/withClient';
import { gitmojis } from '@utils/emoji.js';
import inquirer from 'inquirer';

const promptAndCommit = (options) => {
  prompt(gitmojis, options).then((questions) => {
    inquirer.prompt(questions).then(async (answers) => {
      aiResponse(answers).then((transformedAnswers) => {
        return withClient(transformedAnswers);
      });
    });
  });
};

const aiCommit = (options) => {
  return promptAndCommit(options);
};

export default aiCommit;
