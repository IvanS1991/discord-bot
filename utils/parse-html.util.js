const { JSDOM } = require('jsdom');

const cleanUpHtmlTags = (text) => {
  return text.replace(/<.*?>/g, '');
};

const parseHtml = (html) => {
  const dom = new JSDOM(html);
  const window = dom.window;
  const document = window.document;

  const parseSingle = (configItem) => {
    const el = document.querySelector(configItem.selector);
    const containedIn = configItem.containedIn;
    let outputItem;
    if (!el) {
      return null;
    }
    if (containedIn === 'innerHTML') {
      outputItem = el.innerHTML;
    } else if (containedIn === 'href') {
      outputItem = el.getAttribute('href');
    } else if (containedIn === 'src') {
      outputItem = el.getAttribute('src');
    }
    outputItem = cleanUpHtmlTags(outputItem);
    return outputItem
      .replace(/\\\w{1}/, '')
      .trim();
  };

  const parseMultiple = (config) => {
    const parsedData = {};

    Object.keys(config).forEach((key) => {
      const configItem = config[key];
      parsedData[key] = parseSingle(configItem);
    });

    return parsedData;
  };

  return {
    toLink: parseSingle,
    toData: parseMultiple,
  };
};

module.exports = parseHtml;
