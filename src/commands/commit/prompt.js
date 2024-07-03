/* eslint-disable */
import guard from '@utils/guard.js';
import { capitaliseTitle } from '../../utils/capitaliseTitle.js';
import configurationVault from '../../utils/configurationVault/index.js';
import getDefaultCommitContent from '@utils/getDefaultCommitContent.js';
import filtergitemo from '@utils/filtergitemo.js';

// inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

const TITLE_MAX_LENGTH_COUNT = 48;

export default async (gitmojis, options) => {
  const { title, message } = getDefaultCommitContent(options);

  return [
    {
      name: 'gitmoji',
      message: 'Choose a gitmoji commit type:',
      type: 'list',
      choices: gitmojis.map(({ emoji, type, description }) => ({
        value: `${emoji} ${type}`,
        name: `${emoji} : ${type} - ${description}`,
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
