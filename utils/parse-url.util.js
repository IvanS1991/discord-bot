const parseUrl = (url, baseUrl) => {
  const isRelativeUrl = url[0] === '/';
  if (isRelativeUrl) {
    return `${baseUrl}${url}`;
  }
  return url;
};

module.exports = parseUrl;
