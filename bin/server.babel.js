const fs = require('fs');
const babelrc = fs.readFileSync('.babelrc'); // eslint-disable-line

require('babel-register')(JSON.parse(babelrc));
