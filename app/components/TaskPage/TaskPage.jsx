import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button, Container} from 'muicss/react';
import Header from '../Header/Header';
import Card from 'react-material-card';
import swal from 'sweetalert2';
import {actionGetTask, actionDeleteTask} from '../../actions/';
import {onComplete} from '../AddTask/AddTask';

class TaskPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    const {id} = params;
    if (id)
      dispatch(actionGetTask(id));
  }

  onDelete() {
    const {dispatch, params} = this.props;
    swal({
      title: 'Delete task',
      text: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(() => dispatch(actionDeleteTask(params.id, onComplete)));
  }

  render() {
    const {task, params} = this.props;

    if (!task)
      return null;

    return (
      <div>
        <Header />
        <Container>
          <div className="mui--text-display1">{task.title}</div>
          <div className="mui--text-subhead">{task.description}</div>
          <Link to={`/edit/${params.id}`} style={({marginRight: '15px'})}>
            <Button variant="raised" color="primary">
              Edit
            </Button>
          </Link>
          <Button variant="raised" color="danger" onClick={this._onDelete}>
            Delete
          </Button>
        </Container>
        <Link to="/">
          <Button variant="fab" color="accent" className="floatButton">
            &#9776;
          </Button>
        </Link>
      </div>
    );
  }
}

TaskPage.propTypes = {
  task: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    task: state.task,
  };
};

export default connect(mapStateToProps)(TaskPage);
