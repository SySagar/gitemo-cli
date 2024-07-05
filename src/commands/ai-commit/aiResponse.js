import { ai_model } from '../../config/ai.js';
import guard from '@utils/guard.js';
import ora from 'ora';

export async function aiResponse({ gitmoji, ai_prompt }) {
  const prompt = `
    I want commit message and title based on the type = ${gitmoji} of git commit. The message should be describing something 
    like this where about : ${ai_prompt}. 
    These are the type variants I have and is most likely to be passsed to you here:
    🚀 - :rocket: - New feature or proposition
    🐛 - :bug: - Fix a bug  
    📝 - :memo: - Add or update documentation
    💄 - :lipstick: - Add or update the UI and style files.
    ♻️ - :recycle: - Refactor code.
    🧪 - :test_tube: - Add test cases, test files or fix existing tests.
    ⚙️ - :chore: - Update grunt task/ auxilary tasks
    🔖 - :bookmark: - Release / Version tags.
    🚧 - :construction: - Work in progress.
    📦 - :package: - Update compiled files or packages.

    for example;
    if type is'feat'
    and about is 'I have done task like pretifying code and code correction'

    it should strictly return like this format which is a json object with all proper space, formatting and intial letter of title small:
    { gitmoji: '🚀 feat', title: 'commit title', message: 'Whatever changes has been madein this commit' }

    Make sure there is a space between emoji and type like this
    gitmoji: '⚙️ chore'

    note: do not make the title too long based on about/description given. It should contain words from 2 - 6
    Just give me the output as I have mentioed above no additional description, no code, nothing. just show me the output like this format I described above.


    `;
  const spinner = ora('Generating commit message...\n\n');
  spinner.start();
  const result = await ai_model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    const jsonObject = JSON.parse(jsonString);

    spinner.stop();

    return jsonObject;
  } catch (error) {
    console.log(guard.prompt_fail);
  } finally {
    spinner.stop();
  }
}
