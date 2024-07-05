import os from 'os';
import path from 'path';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import configurationVault from '@utils/configurationVault/index.js';
import { comparePassword } from '@utils/hash.js';
dotenv.config();

const verifyUser = async (key) => {
  const keyFromConfig = configurationVault.getUserKey();
  return await comparePassword(keyFromConfig, key).then((match) => {
    if (!match) {
      console.log(chalk.red(`Key has been changed\n\n`));
      return undefined;
    }
    return key;
  });
};

async function requireLogin(command) {
  try {
    const FILENAME = process.env.KEY_FILENAME;
    const homeDir = os.homedir();
    const filePath = path.join(homeDir, FILENAME);
    const fileData = readFileSync(filePath, 'utf8');
    const { key } = JSON.parse(fileData);

    return await verifyUser(key);
  } catch (error) {
    if (command === 'login') {
      return 1;
    }
    console.log(chalk.red(`No key found! Please login first\n\n`));
    console.log(`use ${chalk.cyan('gitemo login')} to login\n`);
  }
}

export default requireLogin;
