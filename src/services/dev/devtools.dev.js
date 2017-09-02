/* istanbul ignore next */
import Provider from './../../components/Provider';

export default (render, store) => {
  if (process.env.NODE_ENV !== 'production' && !window.devToolsExtension) {
    const devToolsDest = document.createElement('div');

    window.document.body.insertBefore(devToolsDest, null);
    const DevTools = require('./../../components/DevTools/DevTools');

    render(
      <Provider
        key="provider"
        store={store}
      >
        <DevTools />
      </Provider>,
      devToolsDest
    );
  }
};
