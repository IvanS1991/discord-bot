/* global process */

const express = require('express');
const app = express();
const http = require('http');

const handler = require('./handler/');

const { PORT } = require('../app-config');

const init = (data) => {
  const controllers = require('./controllers')(data);

  controllers.forEach((controller) => {
    handler.subscribe(controller.command, controller.handler);
  });

  app.get('*', (req, res) => {
    res.status(404).send('<h1>Kaka filka bot</h1>');
  });

  app.listen(process.env.PORT || PORT);

  setInterval(() => {
    http.get('http://kaka-filka-bot.herokuapp.com');
  }, 60000);
};

module.exports = { init };
