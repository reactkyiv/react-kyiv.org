import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import apiMiddleware from './middlewares/apiMiddleware';
import createReducers from './reducer';

export const inject = (store, name, asyncReducer) => {
  if (store.asyncReducers[name]) return;
  store.asyncReducers[name] = asyncReducer; // eslint-disable-line
  store.replaceReducer(combineReducers(createReducers(store.asyncReducers)));
};

const getMissingReducers = (reducers, data) => {
  if (!data) return {};

  return Object.keys(data).reduce(
    (prev, next) => (reducers[next] ? prev : { ...prev, [next]: (state = {}) => state }),
    {}
  );
};

export default function createStore(history, helpers, data) {
  const middleware = [apiMiddleware({ api: helpers.api }), routerMiddleware(history)];

  let enhancers = [applyMiddleware(...middleware)]; // eslint-disable-line

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../components/DevTools');

    enhancers = [ // eslint-disable-line
      ...enhancers,
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    ];
  }

  const finalCreateStore = compose(...enhancers)(_createStore);
  const missingReducers = getMissingReducers(createReducers(), data);
  const store = finalCreateStore(combineReducers(createReducers(missingReducers)), data);

  store.asyncReducers = {}; // eslint-disable-line
  store.inject = inject.bind(null, store); // eslint-disable-line

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => {
      const reducer = require('./reducer');

      store.replaceReducer(combineReducers((reducer.default || reducer)(store.asyncReducers)));
    });
  }

  return store;
}
