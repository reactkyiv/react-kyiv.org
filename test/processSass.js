const sass = require('node-sass');
const path = require('path');

module.exports = function processSass(data, filename) {
  const result = sass.renderSync({ // eslint-disable-line
    data,
    file: filename,
    includePaths: [path.join(__dirname, '/../src/theme/variables.scss')],
  });

  return result.css.toString('utf8');
};
