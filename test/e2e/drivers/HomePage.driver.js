import { browser, element, by } from 'protractor';

class HomeDriver {
  when = {
    navigated: async (url = '/') => browser.get(url),
  };
  is = {
    ok: () => element(by.css('[data-testid=homePage]')).isDisplayed(),
  };
  get = {

  }
}

export default HomeDriver;

