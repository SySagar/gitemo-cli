const getDefaultCommitContent = (options) => {
  return {
    title: options['title'] || null,
    message: options['message'] || null,
  };
};

export default getDefaultCommitContent;
