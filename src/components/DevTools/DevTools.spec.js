/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import DevToolsDriver from './DevTools.driver';

describe('DevTools', () => {
  let driver = null;

  beforeEach(() => {
    driver = new DevToolsDriver();
  });

  it('should render correctly', () => {
    expect(driver.when.created().get.isOk()).toBeTruthy();
  });
});
