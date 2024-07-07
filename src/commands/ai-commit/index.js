import { aiResponse } from './aiResponse';
import prompt from './prompt';
import withClient from '@commands/commit/withClient';
import { gitmojis } from '@utils/emoji.js';
import inquirer from 'inquirer';
import { isRateLimited } from '../../config/rateLimit.js';
import chalk from 'chalk';
import configurationVault from '@utils/configurationVault/index.js';
import { capitaliseTitle } from '@utils/capitaliseTitle.js';

const promptAndCommit = (options) => {
  prompt(gitmojis, options).then((questions) => {
    inquirer.prompt(questions).then(async (answers) => {
      aiResponse(answers).then((aiAnswers) => {
        const transformedAnswers = {
          ...aiAnswers,
          title: configurationVault.getCapitalizeTitle()
            ? capitaliseTitle(aiAnswers.title)
            : aiAnswers.title,
          message: configurationVault.getMessagePrompt()
            ? aiAnswers.message
            : '',
        };

        return withClient(transformedAnswers);
      });
    });
  });
};

const aiCommit = (options) => {
  if (configurationVault.getAIKey() === '') {
    console.log(chalk.red('No AI key found. Please set one using:'));
    console.log(chalk.blue('gitemo --g\n'));
    return;
  }

  if (configurationVault.getMaxRateLimitCount() > 0 && isRateLimited()) {
    console.log(
      chalk.red(
        'You have exceeded the maximum number of AI commits per hour. Please try again later.'
      )
    );
    return;
  }
  return promptAndCommit(options);
};

export default aiCommit;
