import chalk from 'chalk';

const errors = {
  title: chalk.red('Enter a valid commit title'),
  ai_prompt: chalk.red('Enter some prompt'),
  prompt_fail: chalk.red('Something went wrong. Please try after some time'),
};

const title = (title) => (!title ? errors.title : true);
const ai_prompt = (ai_prompt) => (!ai_prompt ? errors.ai_prompt : true);
const prompt_fail = errors.prompt_fail;

export default {
  title,
  ai_prompt,
  prompt_fail,
};
