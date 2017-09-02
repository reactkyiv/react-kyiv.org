import xhrMock from 'xhr-mock';
import isOnline from './isOnline';

describe('isOnline', () => {
  beforeEach(() => xhrMock.setup());
  afterEach(() => xhrMock.teardown());

  it('should resolved with false when offline', (done) => {
    isOnline().then((state) => {
      expect(state).toBeFalsy();
      done();
    });
  });

  it('should resolved with true when online', (done) => {
    const { host, protocol } = window.location;
    const mockedUrl = `${protocol}//${host}/favicon.ico`;

    xhrMock.mock('HEAD', mockedUrl, (req, res) => res.status(200));

    isOnline().then((state) => {
      expect(state).toBeTruthy();
      done();
    });
  });

  it('should resolved with false when wrong response', (done) => {
    const { host, protocol } = window.location;
    const mockedUrl = `${protocol}//${host}/favicon.ico`;

    xhrMock.mock('HEAD', mockedUrl, () => null);

    isOnline().then((state) => {
      expect(state).toBeFalsy();
      done();
    });
  });

  it('should resolved with false when wrong status', (done) => {
    const { host, protocol } = window.location;
    const mockedUrl = `${protocol}//${host}/favicon.ico`;

    xhrMock.mock('HEAD', mockedUrl, (res) => res.progress());

    isOnline().then((state) => {
      expect(state).toBeFalsy();
      done();
    });
  });
});
