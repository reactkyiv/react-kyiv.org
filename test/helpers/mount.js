import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { match } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';

import i18n from './../../src/i18n';
import Api from './../../src/helpers/Api';
import createStore from './../../src/redux/create';
import Provider from './../../src/components/Provider';
import getRoutes from './../../src/routes';

export const mountAppOnPage = (path) => {
  const mockStore = {};
  const memoryHistory = createHistory(path);
  const store = createStore(memoryHistory, { api: new Api() }, mockStore);
  const history = syncHistoryWithStore(memoryHistory, store);

  return new Promise((resolve) => {
    match({
      history,
      routes: getRoutes(),
      location: path,
    }, (error, redirectLocation, renderProps) => {
      loadOnServer({ ...renderProps, store, helpers: { api: new Api() } }).then(() => {
        const mounted = mount(
          <Provider
            key="provider"
            store={store}
          >
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        resolve(mounted);
      });
    });
  });
};

export const mountWithContext = (component, context = {}) => mount(
  component,
  { context: { i18n, ...context }, childContextTypes: { i18n: PropTypes.object } }
);
