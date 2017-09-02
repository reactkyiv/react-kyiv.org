module.exports = (wallaby) => ({
  files: [
    'test/test_helper.js',
    'test/helpers/**/*.js',
    'src/**/*.key',
    'src/**/*.crt',
    'src/**/*.csr',
    'static/favicon.ico',
    'static/manifest.json',
    'static/**/*.js',
    'static/**/*.css',
    'src/**/*.json',
    'lang/locales/json/*.json',
    { pattern: 'test/**/*.spec.js', ignore: true },
    { pattern: 'src/**/*.spec.js', ignore: true },
    'src/**/*.js*',
    'src/**/*.scss',
    'src/**/*.png',
    'src/**/*.svg',
    'node_modules/bytesize-icons/dist/icons/*.svg',
    'src/**/*.css',
    'src/**/*.less',
  ],

  filesWithNoCoverageCalculated: [
    'src/**/*.dev.js',
    'test/test_helper.js',
    '*.scss',
    '*.css',
    '*.less',
    'src/ssr/services/bootstrap.js',
    'src/ssr/middlewares/http2Push.js',
    'static/**',
  ],

  hints: {
    ignoreCoverage: /istanbul ignore next/,
  },

  tests: [
    { pattern: 'node_modules/*', ignore: true, instrument: false },
    'src/**/*.spec.js*',
    'test/**/*.spec.js*',
  ],

  compilers: {
    '**/*.js': wallaby.compilers.babel(),
  },

  preprocessors: {
    '**/*.png': (file, done) => {
      done('');
    },
    '**/*.svg': (file, done) => {
      done('');
    },
  },


  setup: (target) => {
    target.testFramework.configure({
      moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|gif|svg)$': './test/fileMock.js',
      },
    });
  },

  env: {
    type: 'node',
  },

  workers: {
    initial: 1,
    regular: 1,
    recycle: true,
  },

  testFramework: 'jest',
});
