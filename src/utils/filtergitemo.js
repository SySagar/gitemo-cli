import Fuse from 'fuse.js';

export const options = {
  threshold: 0.5,
  keys: [
    {
      name: 'name',
      weight: 0.33,
    },
    {
      name: 'description',
      weight: 0.67,
    },
  ],
};

const filtergitemo = (input, gitmojis) => {
  const fuse = new Fuse(gitmojis, options);

  return input ? fuse.search(input).map((gitmoji) => gitmoji.item) : gitmojis;
};

export default filtergitemo;
