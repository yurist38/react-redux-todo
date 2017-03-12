import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import TasksList from './components/TasksList/TasksList';
import AddTask from './components/AddTask/AddTask';
import TaskPage from './components/TaskPage/TaskPage';
import reducers from './reducers';
import './scss/global';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={TasksList} />
          <Route path="/add" component={AddTask} />
          <Route path="/task/:id" component={TaskPage} />
          <Route path="/edit/:id" component={AddTask} />
        </Router>
      </Provider>
    );
  }
}

render(
  <App/>,
  document.getElementById('app')
);
