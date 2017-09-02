/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import { stub } from 'sinon';

const addNodeToDom = (params) => {
  const newNode = document.createElement('div');

  newNode.id = 'content';

  Object.assign(newNode, params); // eslint-disable-line

  global.document.body.appendChild(newNode);
};

process.env.IS_SERVER = 1;


describe('Client', () => {
  let init = null;

  beforeEach(() => {
    window.__data = {};
    addNodeToDom({ id: 'content' });
    init = require('./client').init;
  });

  it('should render nothing with react', (done) => {
    window.__data = null;
    const client = init();

    client.then(() => {
      const html = global.document.getElementById('content').innerHTML;

      expect(html).toEqual('<div data-reactroot=""><div>Not Found</div></div>');
      done();
    });
  });

  it('should render not found page with react', (done) => {
    const client = init();

    client.then(() => {
      const html = global.document.getElementById('content').innerHTML;

      expect(html).toEqual('<div data-reactroot=""><div>Not Found</div></div>');
      done();
    });
  });

  it('should render not found page with react', (done) => {
    const client = init();

    client.then(() => {
      const html = global.document.getElementById('content').innerHTML;

      expect(html).toEqual('<div data-reactroot=""><div>Not Found</div></div>');
      done();
    });
  });

  it('should register service worker', (done) => {
    process.env.NODE_ENV = 'production';

    stub(console, 'info');

    navigator.serviceWorker = {
      register: () => Promise.resolve(true),
      ready: {
        then: (callback) => callback(),
      },
    };

    const client = init();

    client.then(() => {
      expect(console.info.args[0][0]).toEqual('Service Worker Ready');
      expect(console.info.args[1][0]).toEqual('Service worker registered!');

      console.info.restore();
      window.__data = null;
      process.env.NODE_ENV = '';
      done();
    });
  });

  it('should not register service worker in unsupported browsers', (done) => {
    process.env.NODE_ENV = 'production';

    stub(console, 'info');

    navigator.serviceWorker = {
      register: () => Promise.reject(true),
      ready: {
        then: (callback) => callback(),
      },
    };

    const client = init();

    client.then(() => {
      expect(console.info.args[0][0]).toEqual('Service Worker Ready');
      expect(console.info.calledOnce).toBeTruthy();

      console.info.restore();
      window.__data = null;
      process.env.NODE_ENV = '';
      done();
    });
  });

  it('should render not found page with default require', (done) => {
    const client = require('./client').default;

    client.then(() => {
      const html = global.document.getElementById('content').innerHTML;

      expect(html).toEqual('<div data-reactroot=""><div>Not Found</div></div>');
      done();
    });
  });

  it('should accept module hot', (done) => {
    const client = require('./client').default;

    client.then(() => {
      const html = global.document.getElementById('content').innerHTML;

      expect(html).toEqual('<div data-reactroot=""><div>Not Found</div></div>');
      done();
    });
  });
});
