import os from 'os';
import path from 'path';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

function requireLogin(command) {
  try {
    const FILENAME = process.env.KEY_FILENAME;
    const homeDir = os.homedir();
    const filePath = path.join(homeDir, FILENAME);
    const fileData = readFileSync(filePath, 'utf8');
    const { key } = JSON.parse(fileData);
    return key;
  } catch (error) {
    if (command === 'login') {
      return 1;
    }
    console.log(chalk.red(`No key found! Please login first\n\n`));
    console.log(`use ${chalk.cyan('gitemo login')} to login\n`);
  }
}

export default requireLogin;
