import { mount } from 'enzyme';
import App from './index';

export default class AppDriver {
  when = {
    created: (props) => {
      this.component = mount(<App
        children={<div className="child"/>}
        {...props}
      />);

      return this;
    },
  };

  get = {
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
    numOfchildren: () => this.component.find('.child').length,
  }
}
