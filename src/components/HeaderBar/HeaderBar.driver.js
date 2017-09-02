import React from 'react'; // eslint-disable-line no-unused-vars
import HeaderBar from './index';
import { mountWithContext } from './../../../test/helpers/mount.js';

export default class HeaderBarDriver {
  when = {
    created: (props) => {
      this.component = mountWithContext(
        <HeaderBar {...props} />,
      );

      return this;
    },
  };

  has = {
  }

  get = {
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
  }
}
