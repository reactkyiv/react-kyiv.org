/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import HtmlDriver from './Html.driver';

describe('Html', () => {
  let driver = null;

  beforeEach(() => {
    driver = new HtmlDriver();
  });

  it('should render correctly', () => {
    expect(driver.when.created().get.isOk()).toBeTruthy();
  });

  it('should render with style assets', () => {
    expect(driver.when.created({
      assets: {
        styles: {
          main: 'magic.css',
        },
      },
    }).is.productionCssPresent()).toBeTruthy();
  });

  it('should render with dll', () => {
    process.env.WEBPACK_DLLS = 1;
    expect(driver.when.created().is.dllPresent()).toBeTruthy();
    process.env.WEBPACK_DLLS = 0;
  });

  it('should hide content when no styles', () => {
    expect(driver.when.created({
      assets: {
        styles: {},
      },
    }).is.contentHidden()).toBeTruthy();
  });
});
