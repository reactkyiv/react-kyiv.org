import request from 'supertest';

describe('When rendering', () => {
  let server = null; // eslint-disable-line

  beforeEach(() => {
    global.webpackIsomorphicTools = {
      refresh: () => {},
      assets: () => ({
        javascript: {
          main: 'magic.js',
        },
      }),
    };
    server = require('./../../src/ssr/server');  // eslint-disable-line
  });

  afterEach(() => server.close());

  it('Should response with Not found page', (done) => {
    request(server).
      get('/random').
      expect(200, (e, data) => {
        expect(data.text.indexOf('Not Found') === -1).toBeFalsy();
        done();
      });
  });

  it('Should response with empty app', (done) => {
    request(server).
      get('/about').
      expect(200, (e, data) => {
        expect(data.text.indexOf('About') === -1).toBeFalsy();
        expect(data.text.indexOf('Home') === -1).toBeTruthy();
        done();
      });
  });

  it('Should response with empty home page', (done) => {
    request(server).
      get('/').
      expect(200, (e, data) => {
        expect(data.text.indexOf('Home') === -1).toBeFalsy();
        expect(data.text.indexOf('magic.js') !== -1).toBeTruthy();
        done();
      });
  });

  it('Should response service worker with headers allowed', (done) => {
    request(server).
      get('/dist/service-worker.js').
      expect(200, (e, data) => {
        expect(data.res.headers['service-worker-allowed']).toBe('/');
        done();
      });
  });

  it('Should response with manifest', (done) => {
    request(server).
      get('/manifest.json').
      expect(200, (e, data) => {
        const text = JSON.parse(data.text);

        expect(typeof text.icons).toBe('object');
        expect(typeof text.name).toBe('string');
        done();
      });
  });

  it('Should work without ssr', (done) => {
    process.env.DISABLE_SSR = 1; // eslint-disable-line

    request(server).
      get('/').
      expect(200, (e, data) => {
        expect(data.text.indexOf('About') === -1).toBeTruthy();
        expect(data.text.indexOf('Home') === -1).toBeTruthy();
        expect(data.text.indexOf('NotFound') === -1).toBeTruthy();
        expect(data.text.indexOf('magic.js') !== -1).toBeTruthy();

        process.env.DISABLE_SSR = 0; // eslint-disable-line
        done();
      });
    process.env.DISABLE_SSR = 0;
  });
});
