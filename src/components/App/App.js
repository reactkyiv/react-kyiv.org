import { Component } from 'react';
import PropTypes from 'prop-types';

/* make sure to not put here any client side code */

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const s = require('./App.scss');

    return (
      <div className={s.app}>
        {this.props.children}
      </div>
    );
  }
}
