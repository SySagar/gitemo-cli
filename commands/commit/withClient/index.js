import { execa } from 'execa';
import chalk from 'chalk';
import configurationVault from "../../../utils/configurationVault/index.js";
const withClient = async answers => {
  try {
    const title = `${answers.gitmoji} : ${answers.title}`;
    const isAutoAddEnabled = configurationVault.getAutoAdd();
    if (isAutoAddEnabled) {
      await execa('git', ['add', '.']);
    } else {
      return;
    }
    await execa('git', ['commit', isAutoAddEnabled ? '-am' : '-m', title, ...(answers.message ? ['-m', answers.message] : [])], {
      buffer: false,
      stdio: 'inherit'
    });
  } catch (error) {
    console.error(chalk.red(error, '\n\n', 'Oops! An error occurred. There is likely additional logging output above.\n'));
  }
};
export default withClient;