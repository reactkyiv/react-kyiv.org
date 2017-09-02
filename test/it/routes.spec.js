/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

describe('Home', () => {
  let routes = null;

  beforeEach(() => {
    process.env.IS_SERVER = '';
    routes = require('./../../src/routes'); // eslint-disable-line
  });

  afterEach(() => {
    process.env.IS_SERVER = 1;
  });

  it('should render correctly', () => {
    expect(routes()).toBeTruthy();
  });
});
