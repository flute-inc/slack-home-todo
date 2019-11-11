require('dotenv').config();
const { App } = require('@slack/bolt');

const homeTodo = require('./home-todo');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});


homeTodo(app);
app.start(process.env.PORT || 3000);
