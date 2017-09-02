import React from 'react';
import { string } from 'prop-types';

export default class Image extends React.Component {
  static propTypes = {
    className: string,
    src: string,
  };

  render() {
    return (
      <img
        className={this.props.className}
        src={this.props.src}
      />
    );
  }
}
