import { mount } from 'enzyme';
import Button from './index';

export default class ButtonDriver {
  when = {
    created: (props) => {
      this.component = mount(
        <Button {...props} />,
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
