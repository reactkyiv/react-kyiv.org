import React from 'react'; // eslint-disable-line
import { mount } from 'enzyme';
import { stub, spy } from 'sinon';
import Provider from './index';

const NUMBER_OF_DEFAULT_ERRORS = 2; // from redux devtools

export default class AboutDriver {
  when = {
    created: (props) => {
      this.store = {
        subscribe: spy(),
        dispatch: spy(),
        getState: spy(),
      };
      this.component = mount(<Provider
        children={<div />}
        store={this.store}
        {...props}
      />);

      stub(console, 'error');

      return this;
    },
    updateStore: (store = {}) => {
      this.component.setProps({ store });

      return this;
    },
  };

  is = {
    warnCalled: () => console.error.callCount === (NUMBER_OF_DEFAULT_ERRORS + 1),
  }

  get = {
    store: () => this.store,
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
  }

  cleanup = () => console.error.restore();
}
