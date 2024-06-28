import chalk from 'chalk';
const errors = {
  title: chalk.red('Enter a valid commit title')
};
const title = title => !title ? errors.title : true;
export default {
  title
};