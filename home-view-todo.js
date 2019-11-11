const _ = require('lodash');

const template = (todos) => {
  const defaultHome = {
    type: "home",
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*TODO🚀*"
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "TODOを作る",
              "emoji": true
            },
            "style": "primary",
            "value": "create_todo",
            "action_id": "home_todo_add"
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*TODO一覧*"
        }
      },
      {
        "type": "divider"
      }
    ]
  };

  defaultHome.blocks.push(...todos);
  return defaultHome;
};

const templateTodo = ({ text = '', blockId = '', deleted = false }) => {
  if (!text) return [];

  const textVal = deleted ? `~${ text }~` : text;

  const todoBlock = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": textVal,
      },
      "block_id": blockId,
      "accessory": {
        "type": "button",
        "style": "primary",
        "text": {
          "type": "plain_text",
          "text": "完了",
          "emoji": true
        },
        "value": "todo",
        "action_id": "home_todo_complete",
      },
    },
    {
      "type": "divider"
    }
  ];

  if (deleted) {
    delete todoBlock[0].accessory;
  }

  return todoBlock;
};

module.exports = ({ todos = [] }) => {
  const templateTodoBlocks = _.flatten(todos.map(todo => templateTodo(todo)));
  const view = template(templateTodoBlocks);
  return view;
};
