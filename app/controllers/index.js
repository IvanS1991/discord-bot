/* globals __dirname */

const fs = require('fs');
const path = require('path');

const pattern = '.controller';

const controllers = (data) => {
  return fs.readdirSync(__dirname)
    .filter((fileName) => fileName.includes(pattern))
    .map((match) => {
      const command = match.slice(0, match.indexOf(pattern));
      const handler = require(path.join(__dirname, match));
      return handler(command, data);
    });
};

module.exports = controllers;
