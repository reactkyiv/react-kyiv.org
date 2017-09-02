import About from './index';

import { mountWithContext, mountAppOnPage } from './../../../test/helpers/mount.js';

export default class AboutDriver {
  when = {
    created: (props) => {
      this.component = mountWithContext(<About {...props} />);

      this.asyncComponent = mountAppOnPage('/about').then((result) => {
        this.componentFromRouter = result;
      });

      return this;
    },
  };

  get = {
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
    text: () => this.component.text(),
    textOnComponentFromRouter: () => this.componentFromRouter.text(),
  }
}
