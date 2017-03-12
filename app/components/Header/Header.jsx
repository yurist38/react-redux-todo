import React, {PropTypes} from 'react';
import {Appbar, Button} from 'muicss/react';
import {Link} from 'react-router';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import styles from './style';

export default class Header extends React.Component {
  render() {
    return (
      <Appbar className={styles.header}>
        <Link to="/" className="mui--text-light">
          <span>Task Planner</span>
        </Link>
      </Appbar>
    );
  }
}
