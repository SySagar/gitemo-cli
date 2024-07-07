import inquirer from 'inquirer';

import configurationPrompts from './prompt.js';
import { CONFIG } from '@constants/config.js';
import configurationVault from '@utils/configurationVault/index.js';
import chalk from 'chalk';

const config = () => {
  inquirer
    .prompt(configurationPrompts())
    .then((answers) => {
      configurationVault.setAutoAdd(answers[CONFIG.AUTO_ADD]);
      configurationVault.setMessagePrompt(answers[CONFIG.MESSAGE_PROMPT]);
      configurationVault.setCapitalizeTitle(answers[CONFIG.CAPITALIZE_TITLE]);
      configurationVault.setAIKey(answers[CONFIG.AI_KEY]);
      configurationVault.setMaxRateLimitCount(
        Number(answers[CONFIG.MAX_RATE_LIMIT_COUNT])
      );
    })
    .then(() => {
      console.log(chalk.greenBright('\nconfiguration saved\n'));
    })
    .catch((error) => {
      console.log(chalk.red('Something went wrong'));
    });
};

export default config;
