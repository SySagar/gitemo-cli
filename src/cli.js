#!/usr/bin/env node
import meow from 'meow';
import FLAGS from '@constants/flag.js';
import findGitemoCommand from '@utils/findGitemoCommands.js';

const cli = meow(
  `
    Usage
      $ gitemo [option] [command]
    Options
      --${FLAGS.COMMIT}, -c    Interactively commit using the prompts
      --${FLAGS.LIST}, -l      List all the available git emojis
      --${FLAGS.VERSION}, -v   Print gitemo-cli installed version
    Commands
      commit          Interactively commit using the prompts
      list            List all the available gitmojis
      version         Print gitemo-cli installed version
    Examples
      $ gitemo -c
  `,
  {
    importMeta: { url: import.meta.url },
    flags: {
      [FLAGS.COMMIT]: { type: 'boolean', shortFlag: 'c' },
      [FLAGS.AIC]: { type: 'boolean', shortFlag: 'aic' },
      [FLAGS.HELP]: { type: 'boolean', shortFlag: 'h' },
      [FLAGS.LIST]: { type: 'boolean', shortFlag: 'l' },
      [FLAGS.VERSION]: { type: 'boolean', shortFlag: 'v' },
    },
  }
);

export const options = {
  [FLAGS.COMMIT]:async (options) =>
  (await import('./commands/commit/index.js')).default(options),
  [FLAGS.AIC]:async (options) =>
  (await import('./commands/ai-commit/index.js')).default(options),
  [FLAGS.LIST]: async () =>
  (await import('./commands/list/index.js')).default(),
}

findGitemoCommand(cli, options);