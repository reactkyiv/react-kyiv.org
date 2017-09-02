import { mount } from 'enzyme';
import DevTools from './index';

export default class DevToolsDriver {
  when = {
    created: (props) => {
      this.component = mount(
        <DevTools {...props} />,
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
