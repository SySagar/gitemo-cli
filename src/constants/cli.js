#!/usr/bin/env node
import meow from 'meow';
import FLAGS from './flag';

const cli = meow(
  `
    Usage
      $ gitmoji [option] [command]
    Options
      --${FLAGS.COMMIT}, -c    Interactively commit using the prompts
      --${FLAGS.LIST}, -l      List all the available gitmojis
      --${FLAGS.VERSION}, -v   Print gitmoji-cli installed version
    Commands
      commit          Interactively commit using the prompts
      list            List all the available gitmojis
      version         Print gitmoji-cli installed version
    Examples
      $ gitmoji -c
  `,
  {
    importMeta: { url: import.meta.url },
    flags: {
      [FLAGS.COMMIT]: { type: 'boolean', shortFlag: 'c' },
      [FLAGS.HELP]: { type: 'boolean', shortFlag: 'h' },
      [FLAGS.LIST]: { type: 'boolean', shortFlag: 'l' },
      [FLAGS.VERSION]: { type: 'boolean', shortFlag: 'v' },
    },
  }
);
