import superagent from 'superagent';
import config from '../../config';

export const GET_TASKS = 'GET_TASKS';
export function actionGetTasks() {
  return (dispatch) => {
    superagent
      .get(config.apiHost + '/tasks')
      .end((err, res) => {
        if (err)
          console.warn('Error: ', err);
        else
          dispatch(actionSetTasks(res.body.tasks));
      });
  };
}

export const SET_TASKS = 'SET_TASKS';
export function actionSetTasks(tasks) {
  return {
    type: SET_TASKS,
    tasks
  };
}

export function actionAddTask(task, cb) {
  return (dispatch) => {
    superagent
      .post(config.apiHost + '/task')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(task)
      .end((err, res) => {
        if (err) {
          cb('error', 'Something went wrong... Please try later or just train your memory :)');
        } else {
          dispatch(actionSetTaskAdded(res.body));
          cb('success', 'Congrats! Your task has been saved.');
        }
      });
  };
}

export function actionUpdateTask(task, cb) {
  return (dispatch) => {
    superagent
      .put(`${config.apiHost}/task/${task.id}`)
      // .set('Content-Type', 'application/json')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key')
      // .accept('application/vnd.api+json')
      // .type('application/vnd.api+json')
      .send({title: task.title, description: task.description})
      .end((err, res) => {
        if (err) {
          cb('error', 'Something went wrong... Please try later or just train your memory :)');
        } else {
          dispatch(actionSetTaskAdded(res.body));
          cb('success', 'Congrats! Your task has been updated.');
        }
      });
  };
}

export const ADD_TASK = 'ADD_TASK';
export function actionSetTaskAdded(task) {
  return {
    type: ADD_TASK,
    task
  };
}

export const GET_TASK = 'GET_TASK';
export function actionGetTask(id, cb) {
  return (dispatch) => {
    superagent
      .get(`${config.apiHost}/task/${id}`)
      .end((err, res) => {
        if (err) {
          console.warn('Error: ', err);
        } else if (res.body) {
          dispatch(actionSetTask(res.body));
          if (typeof cb === 'function') cb(res.body.title, res.body.description);
        }
      });
  };
}

export const SET_TASK = 'SET_TASK';
export function actionSetTask(task) {
  return {
    type: SET_TASK,
    task
  };
}

export function actionDeleteTask(id, cb) {
  return (dispatch) => {
    superagent
      .delete(`${config.apiHost}/task/${id}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          cb('error', 'Something went wrong, cannot delete the task...');
        } else {
          dispatch(actionSetTaskDeleted(id));
          cb('success', 'Task has been deleted.');
        }
      });
  };
}

export const DELETE_TASK = 'DELETE_TASK';
export function actionSetTaskDeleted(id) {
  return {
    type: DELETE_TASK,
    id
  };
}
