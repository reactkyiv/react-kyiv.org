import React from 'react'; // eslint-disable-line no-unused-vars
import NotFound from './index';

import { mountWithContext, mountAppOnPage } from './../../../test/helpers/mount.js';

export default class NotFoundDriver {
  when = {
    created: (props) => {
      this.component = mountWithContext(<NotFound {...props} />);

      this.asyncComponent = mountAppOnPage('/NotFound').then((result) => {
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
