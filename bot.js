const Discord = require('discord.js');

const handler = require('./app/handler/');
const { BOT_TOKEN, DB_CONN_STR } = require('./app-config');

const client = new Discord.Client();

require('./db').init(DB_CONN_STR)
  .then((db) => {
    return require('./data').init(db);
  })
  .then((data) => {
    return require('./app').init(data);
  })
  .then(() => {
    client.login(BOT_TOKEN);

    client.on('ready', () => {
      console.log('Kaka filka up and running...');
    });

    client.on('message', handler.invoke);
  })
  .catch((err) => {
    console.log(err);
  });
