/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import AppDriver from './App.driver';

describe('App', () => {
  let driver = null;

  beforeEach(() => {
    driver = new AppDriver();
  });

  it('should render correctly', () => {
    expect(driver.when.created().get.isOk()).toBeTruthy();
  });

  it('should render 1 children', () => {
    expect(driver.when.created().get.numOfchildren()).toBe(1);
  });
});
