import { mount } from 'enzyme';
import Html from './Html';

export default class HtmlDriver {
  when = {
    created: (props) => {
      this.component = mount(
        <Html {...props} />,
      );

      return this;
    },
  };

  has = {
  }

  is = {
    productionCssPresent: () => this.component.html().indexOf('magic.css') !== -1,
    dllPresent: () => this.component.html().indexOf('/dist/dlls/dll__vendor.js') !== -1,
    contentHidden: () => this.component.html().indexOf('#content{display:none}') !== -1,
  }

  get = {
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
  }
}
