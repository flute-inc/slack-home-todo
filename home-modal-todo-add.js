module.exports = {
  "type": "modal",
  "callback_id": "modal_todo_add_done",
  "title": {
    "type": "plain_text",
    "text": "新規TODOの作成",
    "emoji": true
  },
  "submit": {
    "type": "plain_text",
    "text": "この内容で作成する",
    "emoji": true
  },
  "close": {
    "type": "plain_text",
    "text": "(×)作成をやめる",
    "emoji": true
  },
  "blocks": [
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": "新しいTODOの作成を行います"
        }
      ]
    },
    {
      "type": "divider"
    },
    {
      "block_id": "todo_input",
      "type": "input",
      "element": {
        "type": "plain_text_input",
        "placeholder": {
          "type": "plain_text",
          "text": "例）議事録を書く"
        },
        "action_id": "input_value"
      },
      "label": {
        "type": "plain_text",
        "text": "TODO",
        "emoji": true
      },
    }
  ]
};
