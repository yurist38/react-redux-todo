import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Button, Container, Form, Input, Textarea} from 'muicss/react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import Header from '../Header/Header';
import swal from 'sweetalert2';
import {
  actionAddTask, actionGetTask, actionUpdateTask, actionSetTask,
  actionDeleteTask
} from '../../actions/';

export function onComplete(type, text) {
  const success = type === 'success';
  const opt = {
    title: success ? 'Done!' : 'Error!',
    text,
    type,
    allowEscapeKey: false,
    allowOutsideClick: false
  };
  swal(opt).then(
    () => (success) ? browserHistory.push('/') : null
  );
}

class AddTask extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      description: '',
      isSending: false,
      isEditing: false
    };
    this._onCreate = this.onCreate.bind(this);
    this._onUpdate = this.onUpdate.bind(this);
    this._onFormEdit = this.onFormEdit.bind(this);
    this._onDelete = this.onDelete.bind(this);
  }

  onCreate() {
    const {dispatch} = this.props;
    const {title, description} = this.state;
    this.setState({isSending: true});
    dispatch(actionAddTask({title, description}, onComplete));
  }

  onUpdate() {
    const {dispatch, params} = this.props;
    const {title, description} = this.state;
    this.setState({isSending: true});
    dispatch(actionUpdateTask({id: params.id, title, description}, onComplete));
  }

  onDelete() {
    const {dispatch, params} = this.props;
    this.setState({isSending: true});
    swal({
      title: 'Delete task',
      text: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(() => dispatch(actionDeleteTask(params.id, onComplete)));
  }

  onFormEdit(e) {
    const name = e.target.getAttribute('name');
    const value = e.target.value;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    if (params.id) {
      dispatch(actionGetTask(params.id, (title, description) => {
        this.setState({title, description, isEditing: true});
      }));
    } else {
      dispatch(actionSetTask({}));
      this.setState({title: null, description: null, isEditing: false});
    }
  }

  render() {
    const {title, description, isSending, isEditing} = this.state;
    const {task, params} = this.props;
    const createButtonText = isSending ? 'Creating...' : 'Create';
    const updateButtonText = isSending ? 'Updating...' : 'Update';
    const buttonText = isEditing ? updateButtonText : createButtonText;
    const isButtonDisabled = !title || !description || isSending;

    if (!task)
      return null;

    const mainContent = (params.id && !task.id) ? <div>This task has not been found...</div> :
      <div>
        <Form>
          <legend>Add New Task</legend>
          <Input
            label="Title"
            name="title"
            tabIndex="1"
            value={title || ''}
            onChange={this._onFormEdit}
            floatingLabel
            required
          />
          <Textarea
            label="Description"
            name="description"
            tabIndex="2"
            value={description || ''}
            onChange={this._onFormEdit}
            floatingLabel
            required
          />
        </Form>
        <Button
          variant="raised"
          color="primary"
          tabIndex="3"
          onClick={isEditing ? this._onUpdate : this._onCreate}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </Button>
      </div>;

    return (
      <div>
        <Header />
        <Container>
          {mainContent}
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

AddTask.propTypes = {
  task: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    task: state.task,
  };
};

export default connect(mapStateToProps)(AddTask);
