/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import HomeDriver from './Home.driver';

describe('Home', () => {
  let driver = null;
  let timer = null;

  beforeEach((done) => {
    driver = new HomeDriver();
    driver.when.created();
    // because we need to wait for redux-async-connect, to render
    const DELAY_FOR_REQUEST = 50; // because it our performance restriction

    timer = setTimeout(() => done(), DELAY_FOR_REQUEST);
  });

  afterEach(() => clearTimeout(timer));

  it('should render correctly', () => {
    expect(driver.get.isOk()).toBeTruthy();
  });

  it('should render with correct text', () => {
    expect(driver.get.text()).toBe('Home page');
  });

  it('should render with correct text on link', () => {
    expect(driver.get.linkText()).toBe('About');
  });

  it('should have correct href in link', () => {
    expect(driver.get.linkUrl()).toBe('/about');
  });
});
