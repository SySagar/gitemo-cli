import COMMIT_MODES from '../constants/commitMode';

const getDefaultCommitContent = (options) => {
  if (options.mode === COMMIT_MODES.CLIENT) {
    return {
      message: options['message'] || null,
      title: options['title'] || null,
    };
  }
};

export default getDefaultCommitContent;
