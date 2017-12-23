const handler = require('./handler/');

const init = (data) => {
  const controllers = require('./controllers')('data');

  controllers.forEach((controller) => {
    handler.subscribe(controller.command, controller.handler);
  });
};

module.exports = { init };
