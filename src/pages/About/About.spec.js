/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import AboutDriver from './About.driver';

describe('About', () => {
  let driver = null;

  beforeEach(() => {
    driver = new AboutDriver();
  });

  it('should render correctly', () => {
    expect(driver.when.created().get.isOk()).toBeTruthy();
  });

  it('should render with correct text', () => {
    expect(driver.when.created().get.text()).toBe('About page');
  });

  it('should render with correct text, when render is async', (done) => {
    driver.when.created();
    setTimeout(() => {
      expect(driver.get.textOnComponentFromRouter()).toBe('About page');
      done();
    });
  });
});
