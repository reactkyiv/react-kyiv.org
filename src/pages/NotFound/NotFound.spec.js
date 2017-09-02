/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import NotFoundDriver from './NotFound.driver';

describe('NotFound', () => {
  let driver = null;

  beforeEach(() => {
    driver = new NotFoundDriver();
  });

  it('should render correctly', () => {
    expect(driver.when.created().get.isOk()).toBeTruthy();
  });

  it('should render with correct text', () => {
    expect(driver.when.created().get.text()).toBe('Not Found');
  });

  it('should render with correct text, when render is async', (done) => {
    driver.when.created();
    setTimeout(() => {
      expect(driver.get.textOnComponentFromRouter()).toBe('Not Found');
      done();
    });
  });
});
