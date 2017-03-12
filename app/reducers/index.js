import {combineReducers} from 'redux';
import {SET_TASKS, SET_TASK} from '../actions';

function tasks(state = [], action) {
  switch (action.type) {
    case SET_TASKS:
      return action.tasks;
  }
  return state;
}

function task(state = {}, action) {
  switch (action.type) {
    case SET_TASK:
      return action.task;
  }
  return state;
}

const allReducers = combineReducers({
  tasks,
  task
});

export default allReducers;
