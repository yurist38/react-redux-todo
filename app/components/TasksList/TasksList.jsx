import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button, Container} from 'muicss/react';
import Header from '../Header/Header';
import Card from 'react-material-card';
import {actionGetTasks} from '../../actions/';
import styles from './style';

class TasksList extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actionGetTasks());
  }

  render() {
    const {tasks} = this.props;

    let noTasksContent = tasks.length ? null :
      (
        <div>
          <p>Seems like you don't have noted tasks yet... It's right time to add one!</p>
          <Link to="/add">
            <Button variant="raised" color="primary">Create First Task</Button>
          </Link>
        </div>
      );

    const cards = tasks.map((t) => {
      const bgImage = t.image || 'https://www.stjordalfoto.no/templates/newyork/images/no_image.png';
      return (
        <Link to={`/task/${t.id}`} className={styles.cardLink} key={t.id}>
          <Card level={2} className={styles.card}>
            <div
              className={styles.imageWrapper}
              style={({backgroundImage: `url(${bgImage})`})}
            >
            </div>
            <div className={styles.cardText}>
              <div className={styles.cardTitle}>{t.title}</div>
              <div className={styles.cardDescription}>{t.description}</div>
            </div>
          </Card>
        </Link>
      );
    });
    return (
      <div>
        <Header />
        <Container>
          <div className="mui--text-display1">All Tasks</div>
          <div className={styles.cardsContainer}>
            {cards}
          </div>
          {noTasksContent}
        </Container>
        <Link to="/add">
          <Button variant="fab" color="accent" className="floatButton">
            +
          </Button>
        </Link>
      </div>
    );
  }
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps)(TasksList);
