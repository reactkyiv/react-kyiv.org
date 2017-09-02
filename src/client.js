/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { useScroll } from 'react-router-scroll';

import 'reset-css/reset.css';
import './styles.scss';

import Provider from './components/Provider';
import createStore from './redux/create';
import getRoutes from './routes';
import Api from './helpers/Api';

import isOnline from './utils/isOnline';

const api = new Api();
const dest = document.getElementById('content');

const hotModuleReplacmentSetup = (store, render) => {
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes')(store);

      render(nextRoutes);
    });
  }
};

export const init = () => Promise.all([window.__data ? true : isOnline()]).
  then(([online]) => {
    const data = !online ? { ...window.__data, online } : { ...window.__data, online };
    const store = createStore(browserHistory, { api }, data);
    const history = syncHistoryWithStore(browserHistory, store);

    const renderRouter = (props) => (
      <ReduxAsyncConnect
        helpers={{ api }}
        render={applyRouterMiddleware(useScroll())}
        {...props}
      />
    );

    const render = (routes) => {
      match({ history, routes }, (error, redirectLocation, renderProps) => {
        ReactDOM.render(
          <HotEnabler>
            <Provider
              key="provider"
              store={store}
            >
              <Router
                history={history}
                render={renderRouter}
                {...renderProps}
              >
                {routes}
              </Router>
            </Provider>
          </HotEnabler>,
          dest
        );
      });
    };

    render(getRoutes(store));

    hotModuleReplacmentSetup(store, render);

    const serverSideCheck = require('./services/dev/ssrCheck.dev');
    const devTools = require('./services/dev/devtools.dev');
    const serviceWorker = require('./services/prod/serviceWorker');

    serverSideCheck(dest, React);
    devTools(ReactDOM.render, store);
    serviceWorker(online);
  });

const initedApp = init();

export default initedApp;
