import chalk from 'chalk';
const printEmojis = gitmojis => {
  return gitmojis.forEach(gitmoji => {
    console.log(`${gitmoji.emoji} - ${chalk.blue(gitmoji.code)} - ${gitmoji.description}`);
  });
};
export default printEmojis;