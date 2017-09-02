/* eslint-disable react/jsx-no-bind */
import { IndexRoute, Route, Redirect } from 'react-router';
import App from './components/App';
import Home from './pages/Home';

// eslint-disable-next-line import/no-dynamic-require
if (process.env.IS_SERVER) {
  global.System = {};
  System.import = (module) => Promise.resolve(require(module));
}

export default () => (
  <Route
    component={App}
    path="/"
  >
    <IndexRoute component={Home} />
    <Route
      component={Home}
      path="/home"
    />
    <Route
      getComponent={() => System.import('./pages/About')}
      path="/about"
    />
    <Route
      getComponent={() => System.import('./pages/NotFound')}
      path="*"
      status={404}
    />
    <Redirect
      from="/start"
      to="/"
    />
  </Route>
);
