const parseUrl = (url, baseUrl) => {
  if (!url) {
    throw new Error('Couldn\'t find that...');
  }
  const isRelativeUrl = url[0] === '/';
  if (isRelativeUrl) {
    return `${baseUrl}${url}`;
  }
  return url;
};

module.exports = parseUrl;
