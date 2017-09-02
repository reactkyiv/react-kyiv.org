import HomePageDriver from './../drivers/HomePage.driver';

describe('HomePage functionality test', () => {
  let driver; // eslint-disable-line

  beforeEach(() => {
    driver = new HomePageDriver(); // eslint-disable-line
  });

  it('should navigate and show home page', async () => {
    await driver.when.navigated();
    expect(await driver.is.ok()).toBeTruthy();
  });
});
