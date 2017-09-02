import React from 'react';
import { bool, func, node } from 'prop-types';
import classNames from 'classnames';

import styles from './Button.scss';

export default class Image extends React.Component {
  static propTypes = {
    children: node,
    icon: bool,
    secondary: bool,
    onClick: func,
  };

  render() {
    let themeClassName = styles.default; // eslint-disable-line

    if (this.props.secondary) {
      themeClassName = styles.secondary; // eslint-disable-line
    }
    if (this.props.icon) {
      themeClassName = styles.icon; // eslint-disable-line
    }

    return (
      <div
        className={classNames(styles.button, themeClassName)}
        onClick={this.props.onClick}
      >
        <span>{this.props.children}</span>
      </div>
    );
  }
}
