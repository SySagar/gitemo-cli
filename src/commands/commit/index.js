import inquirer from 'inquirer';
import { gitmojis } from '../../utils/emoji.js';
import prompt from './prompt.js';
import { capitaliseTitle } from '../../utils/capitaliseTitle.js';
import withClient from './withClient/index.js';
import configurationVault from '../../utils/configurationVault/index.js';
// export type CommitOptions = {
//     message?: string,
//     mode: typeof COMMIT_MODES.CLIENT | typeof COMMIT_MODES.HOOK,
//     scope?: string,
//     title?: string
//   }

const promptAndCommit = (options) => {
  prompt(gitmojis, options).then((questions) => {
    inquirer.prompt(questions).then((answers) => {
      const transformedAnswers = {
        ...answers,
        title: configurationVault.getCapitalizeTitle()
          ? capitaliseTitle(answers.title)
          : answers.title,
      };

      return withClient(transformedAnswers);
    });
  });
};

const commit = (options) => {
  return promptAndCommit(options);
};

export default commit;
