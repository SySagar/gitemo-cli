#!/usr/bin/env node
import meow from 'meow';
import FLAGS from './flag';

const cli = meow(
  `
    Usage
      $ gitmoji [option] [command]
    Options
      --${FLAGS.COMMIT}, -c    Interactively commit using the prompts
      --${FLAGS.CONFIG}, -g    Setup gitmoji-cli preferences.
      --${FLAGS.INIT}, -i      Initialize gitmoji as a commit hook
      --${FLAGS.LIST}, -l      List all the available gitmojis
      --${FLAGS.REMOVE}, -r    Remove a previously initialized commit hook
      --${FLAGS.SEARCH}, -s    Search gitmojis
      --${FLAGS.UPDATE}, -u    Sync emoji list with the repo
      --${FLAGS.VERSION}, -v   Print gitmoji-cli installed version
    Commands
      commit          Interactively commit using the prompts
      config          Setup gitmoji-cli preferences.
      init            Initialize gitmoji as a commit hook
      list            List all the available gitmojis
      remove          Remove a previously initialized commit hook
      search          Search gitmojis
      update          Sync emoji list with the repo
    Examples
      $ gitmoji -l
      $ gitmoji bug linter -s
  `,
  {
    importMeta: { url: import.meta.url },
    flags: {
      [FLAGS.COMMIT]: { type: 'boolean', shortFlag: 'c' },
      [FLAGS.HELP]: { type: 'boolean', shortFlag: 'h' },
      [FLAGS.INIT]: { type: 'boolean', shortFlag: 'i' },
      [FLAGS.LIST]: { type: 'boolean', shortFlag: 'l' },
      [FLAGS.VERSION]: { type: 'boolean', shortFlag: 'v' },
    },
  }
);
