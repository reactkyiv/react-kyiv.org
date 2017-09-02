require('babel-polyfill');

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = (Number(process.env.PORT) + 1) || 3001; // eslint-disable-line

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const babelrc = fs.readFileSync('./.babelrc');// eslint-disable-line

const validDLLs = helpers.isValidDLLs('vendor', assetsPath);

if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0'; // eslint-disable-line
  console.warn('Webpack DLLs disabled: NOT VALID dll file, try to run "npm run postinstall"');
}

const webpackConfig = module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      'react-hot-loader/patch',
      './src/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${host}:${port}/dist/`,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        include: [path.resolve(__dirname, '../src')],
      }, {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [path.resolve(__dirname, '../src')],
      }, {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')],
      }, {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [path.resolve(__dirname, '../src')],
      }, {
        test: /\.scss$/,
        loader: 'happypack/loader?id=sass',
        include: [path.resolve(__dirname, '../src')],
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff',
        },
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream',
        },
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml',
        },
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240,
        },
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),

    new webpack.LoaderOptionsPlugin({
      test: /\.(less|scss)/,
      options: {
        postcss(webpack) {// eslint-disable-line
          return [
            require('postcss-import')({ addDependencyTo: webpack }),
            require('postcss-url')(),
            require('postcss-cssnext')({ browsers: 'last 2 version' }),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')(),
          ];
        },
      },
    }),

    // hot reload
    new webpack.HotModuleReplacementPlugin(),

    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.WEBPACK_DLLS': JSON.stringify(process.env.WEBPACK_DLLS),
    }),

    new webpack.ProvidePlugin({
      React: 'react',
    }),

    webpackIsomorphicToolsPlugin.development(),

    helpers.createHappyPlugin('jsx', [
      {
        loader: 'react-hot-loader/webpack',
      }, {
        loader: 'babel-loader',
        options: JSON.parse(babelrc),
      }, {
        loader: 'eslint-loader',
      },
    ]),
    helpers.createHappyPlugin('css', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ]),
    helpers.createHappyPlugin('less', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'less-loader',
        query: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
    ]),
    helpers.createHappyPlugin('sass', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
    ]),
  ],
};

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  helpers.installVendorDLL(webpackConfig, 'vendor');
}
