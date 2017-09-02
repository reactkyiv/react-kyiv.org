/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import ButtonDriver from './Button.driver';

describe('Button', () => {
  let driver = null;

  beforeEach(() => {
    driver = new ButtonDriver();
  });

  it('should render correctly', () => {
    expect(driver.when.created().get.isOk()).toBeTruthy();
  });
});
