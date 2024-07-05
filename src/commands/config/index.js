import inquirer from 'inquirer';

import configurationPrompts from './prompt.js';
import { CONFIG } from '@constants/config.js';
import configurationVault from '@utils/configurationVault/index.js';

const config = () => {
  inquirer.prompt(configurationPrompts()).then((answers) => {
    configurationVault.setAutoAdd(answers[CONFIG.AUTO_ADD]);
    configurationVault.setMessagePrompt(answers[CONFIG.MESSAGE_PROMPT]);
    configurationVault.setCapitalizeTitle(answers[CONFIG.CAPITALIZE_TITLE]);
  });
};

export default config;
