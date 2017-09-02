import { Component } from 'react';
import PropTypes from 'prop-types';

export default class About extends Component {
  static contextTypes = {
    i18n: PropTypes.object,
  }

  render() {
    const { l } = this.context.i18n;

    const s = require('./About.scss');

    return (
      <div className={s.about}>
        {l('About page')}
      </div>
    );
  }
}

