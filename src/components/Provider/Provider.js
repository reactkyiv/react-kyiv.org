import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import i18n from './../../i18n';

let didWarnAboutReceivingStore = false; // eslint-disable-line

const warning = (message) => {
  console.error(message);
  try {
    throw new Error(message);
  } catch (e) {
    console.error(e);
  }
};

const warnAboutReceivingStore = () => {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true; // eslint-disable-line

  warning(
    '<Provider> does not support changing `store` on the fly. ' +
    'It is most likely that you see this error because you updated to ' +
    'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +
    'automatically. See https://github.com/reactjs/react-redux/releases/' +
    'tag/v2.0.0 for the migration instructions.'
  );
};

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  };

  static childContextTypes = {
    i18n: PropTypes.object,
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  getChildContext() {
    return {
      i18n,
      store: this.store,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (process.env.NODE_ENV !== 'production') {
      const { store } = this;
      const { store: nextStore } = nextProps;

      if (store !== nextStore) {
        warnAboutReceivingStore();
      }
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
