/* eslint-disable */
import guard from './guard';
import { capitaliseTitle } from '../../utils/capitaliseTitle';
import inquirer from 'inquirer';
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import configurationVault from '../../utils/configurationVault';
import getDefaultCommitContent from '../../utils/getDefaultCommitContent';

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

const TITLE_MAX_LENGTH_COUNT = 48;

export default (gitmojis, options) => {
  const { title, message } = getDefaultCommitContent(options);

  return [
    {
      name: 'gitmoji',
      message: 'Choose a gitmoji commit type:',
      type: 'list',
      choices: gitmojis.map(({ emoji, description }) => ({
        value: emoji,
        name: `${emoji}  - ${description}`,
      })),
    },
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input) => {
        const length = (title || input).length.toString().padStart(2, '0');

        return `[${length}/${TITLE_MAX_LENGTH_COUNT}]: ${
          configurationVault.getCapitalizeTitle ? capitaliseTitle(input) : input
        }`;
      },
      ...(title ? { default: title } : {}),
    },
    ...(configurationVault.getMessagePrompt()
      ? [
          {
            name: 'message',
            message: 'Enter the commit message:',
            ...(message ? { default: message } : {}),
          },
        ]
      : []),
  ];
};
