import { execa } from 'execa';
import chalk from 'chalk';
import configurationVault from '@utils/configurationVault/index.js';
import { incrementCount } from '../../../config/rateLimit.js';

const withClient = async (answers) => {
  try {
    const title = `${answers.gitmoji} : ${answers.title}`;
    const isAutoAddEnabled = configurationVault.getAutoAdd();

    if (isAutoAddEnabled) {
      await execa('git', ['add', '.']);
    } else {
      console.log(
        chalk.yellow(
          'Skipping the git add step. You have disabled the auto add feature.'
        )
      );
      console.log(chalk.yellow('No commit action performed'));
      return;
    }

    await execa(
      'git',
      [
        'commit',
        isAutoAddEnabled ? '-am' : '-m',
        title,
        ...(answers.message ? ['-m', answers.message] : []),
      ],
      {
        buffer: false,
        stdio: 'inherit',
      }
    );
    incrementCount();
  } catch (error) {
    console.error(
      chalk.red(
        error,
        '\n\n',
        'Oops! An error occurred. There is likely additional logging output above.\n'
      )
    );
  }
};

export default withClient;
