import http from 'http';
import chalk from 'chalk';
import { writeFileSync } from 'fs';
import ora from 'ora';
import url from 'url';
import { customAlphabet } from 'nanoid';
import { listen } from 'async-listen';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';

dotenv.config();
import os from 'os';

class UserCancellationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserCancellationError';
  }
}

export const FILENAME = '.gitemoKey';

async function writeToConfigFile(data) {
  try {
    const homeDir = os.homedir();
    const filePath = path.join(homeDir, FILENAME);
    writeFileSync(filePath, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to local config file', error);
  }
}

export default async function login() {
  //setting up https server to listen to my next js app
  const server = http.createServer();
  const { port } = await listen(server, 0, '127.0.0.1');

  const nanoid = customAlphabet('123456789QAZWSXEDCRFVTGBYHNUJMIKOLP', 8);

  const authPromise = new Promise((resolve, reject) => {
    server.on('request', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );

      if (req.method === 'OPTIONS') {
        //checks if the server accepts GET requests from domain i.e. http methods are allowd or not

        res.writeHead(200);
        res.end();
        return;
      } else if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);
        const queryParams = parsedUrl.query;

        if (queryParams.cancelled) {
          res.writeHead(200);
          res.end();
          reject(new UserCancellationError('Login process cancelled by user.'));
        } else {
          res.writeHead(200);
          res.end();
          resolve(queryParams);
        }
      } else {
        res.writeHead(405);
        res.end();
      }
    });
  });

  const redirect = `http://127.0.0.1:${port}`;
  const code = nanoid();
  const confirmationUrl = new URL(`${process.env.CLIENT_URL}/auth/devices`);
  confirmationUrl.searchParams.append('code', code);
  confirmationUrl.searchParams.append('redirect', redirect);

  console.log(`Confirmation code: ${chalk.bold.blueBright(code)}\n`);
  console.log(
    `If something goes wrong, copy and paste this URL into your browser: ${chalk.bold(
      confirmationUrl.toString()
    )}\n`
  );

  //opens authentication URL in the user's default web browser
  spawn('open', [confirmationUrl.toString()], { shell: true });

  const spinner = ora('Waiting for authentication...\n\n');

  try {
    spinner.start();
    const authData = await authPromise;
    spinner.stop();
    writeToConfigFile(authData);
    console.log(
      `Authentication successful: wrote key to config file. To view it, type 'cat ~/${FILENAME}'.\n`
    );
    server.close();
    process.exit(0);
  } catch (error) {
    if (error instanceof UserCancellationError) {
      console.log('Authentication cancelled.\n');
      server.close();
      process.exit(0);
    } else {
      console.error('Authentication failed:', error);
      console.log('\n');
      server.close();
      process.exit(1);
    }
  } finally {
    spinner.stop();
    server.close();
    process.exit(0);
  }
}
