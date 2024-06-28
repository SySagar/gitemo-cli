/* eslint-disable */
import guard from '@utils/guard';
import inquirer from 'inquirer';
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import filtergitemo from '@utils/filtergitemo.js';

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

const TITLE_MAX_LENGTH_COUNT = 300;

export default async (gitmojis, options) => {
  return [
    {
      name: 'gitmoji',
      message: 'Choose a gitmoji commit type:',
      type: 'autocomplete',
      source: (answersSoFor, input) => {
        return Promise.resolve(
          filtergitemo(input, gitmojis).map(({ emoji, description, type }) => ({
            value: `${emoji} ${type}`,
            name: `${emoji} : ${type} - ${description}`,
          }))
        );
      },
    },
    {
      name: 'ai_prompt',
      message: 'Enter something about what u made changes',
      validate: guard.ai_prompt,
      transformer: (input) => {
        const length = input.length.toString().padStart(2, '0');

        return `[${length}/${TITLE_MAX_LENGTH_COUNT}]: ${input}`;
      },
    },
  ];
};
