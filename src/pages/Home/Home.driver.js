import { mountAppOnPage } from './../../../test/helpers/mount.js';

export default class HomeDriver {
  when = {
    created: () => {
      this.asyncComponent = mountAppOnPage('/home').then((result) => {
        this.component = result;
      });

      return this;
    },
  };

  get = {
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
    text: () => this.component.find('[data-testId="page-text"]').text(),
    linkText: () => this.component.find('a').at(0).text(),
    linkUrl: () => this.component.find('a').at(0).prop('href'),
  }
}
