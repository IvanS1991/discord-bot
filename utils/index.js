/* globals __dirname */

const fs = require('fs');
const path = require('path');

const pattern = '.util';
const moduleObj = {};

fs.readdirSync(__dirname)
  .filter((file) => file.includes(pattern))
  .forEach((file) => {
    const label = file
      .slice(0, file.indexOf(pattern))
      .split('-')
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word[0].toUpperCase() + word.slice(1);
      })
      .join('');
    const modulePath = path.join(__dirname, file);
    moduleObj[label] = require(modulePath);
  });

module.exports = moduleObj;
