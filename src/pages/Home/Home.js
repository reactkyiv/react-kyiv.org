import { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';
import { asyncConnect } from 'redux-connect';
import { loadWidgets } from './../../redux/modules/widgets/actions';

import HeaderBar from './../../components/HeaderBar';

@asyncConnect([{
  promise: ({ store }) => store.dispatch(loadWidgets()),
}])
export default class App extends Component {
  static contextTypes = {
    i18n: PropTypes.object,
  }

  render() {
    const { l } = this.context.i18n;
    const s = require('./Home.scss');

    return (
      <div
        className={s.home}
        data-testId="homePage"
      >
        <HeaderBar />
        <span data-testId="page-text">{l('Home page')}</span>
        <IndexLink to="/about">{l('About')}</IndexLink>
      </div>
    );
  }
}
