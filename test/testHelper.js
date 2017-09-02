const hook = require('css-modules-require-hook');
const sass = require('node-sass');
const path = require('path');

hook({
  extensions: ['.scss'],
  preprocessCss(css) {
    const result = sass.renderSync({ // eslint-disable-line
      data: css,
      includePaths: [path.join(__dirname, '/../src/theme/variables.scss')],
    });

    return result.css;
  },
});

