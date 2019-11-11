const _ = require('lodash');
const data = require('./data');
const homeViewTodo = require('./home-view-todo');
const homeModalTodoAdd = require('./home-modal-todo-add');
const wrapAsync = func => async (...args) => {
  try {
    await func(...args);
  } catch(err) {
    console.error(err);
  }
};

module.exports = (app) => {

  // HomeTabを開いた場合
  app.event('app_home_opened', wrapAsync(async ({ event, context }) => {
    if ('home' === event.tab) {
      // HomeTab表示
      await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: homeViewTodo({ todos: data.globalTodos }),
      });
    }
  }));

  // HomeTabから「新規作成」を選択した場合 - モーダルを表示させる
  app.action('home_todo_add', wrapAsync(async ({ body, ack, context }) => {
    ack();

    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: homeModalTodoAdd,
    });
  }));

  // 新規作成モーダルで「この内容で作成する」を選択した場合
  app.view('modal_todo_add_done', wrapAsync(async ({ ack, body, context, view }) => {
    ack();

    // モーダル入力値取得
    const val = _.get(view.state.values, ['todo_input', 'input_value', 'value']);

    // タスクのキャッシュ
    const blockId = `globaltodo_${ data.globalTodos.length + 1 }`;
    data.globalTodos.push({ text: val, blockId });

    // HomeTab更新
    await app.client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
      view: homeViewTodo({ todos: data.globalTodos }),
    });
  }));

  // HomeTabのリストからタスクの「完了」を選択した場合
  app.action('home_todo_complete', wrapAsync(async ({ ack, body, context, action }) => {
    ack();

    // 対象に斜線をつける
    data.globalTodos.forEach(todo => {
      if (todo.blockId === action.block_id) {
        todo.deleted = true;
      }
    });

    // HomeTab更新
    await app.client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
      view: homeViewTodo({ todos: data.globalTodos }),
    });
  }));
};
