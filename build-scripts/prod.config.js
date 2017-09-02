const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BundleBuddyWebpackPlugin = require('bundle-buddy-webpack-plugin');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      './src/client.js',
    ],
    core: ['react', 'react-dom', 'redux', 'reselect', 'superagent', 'react-redux'],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
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
          ],
        }),
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                importLoaders: 2,
                sourceMap: true,
              },
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            }, {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
              },
            },
          ],
        }),
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                importLoaders: 2,
                sourceMap: true,
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
                sourceMapContents: true,
              },
            },
          ],
        }),
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
        postcss(webpack) {
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

    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['core'],
      filename: '[name]-[chunkhash].js',
    }),

    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.WEBPACK_DLLS': JSON.stringify(process.env.WEBPACK_DLLS),
    }),

    new webpack.ProvidePlugin({
      React: 'react',
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),

    webpackIsomorphicToolsPlugin,

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'build-scripts/pwa.js',
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'react-redux-universal-hot-example',
      filename: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 8388608,

      // Ensure all our static, local assets are cached.
      staticFileGlobs: [`${path.dirname(assetsPath)}/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}`],
      stripPrefix: path.dirname(assetsPath),

      directoryIndex: '/',
      verbose: true,
      navigateFallback: '/dist/index.html',
      runtimeCaching: [{
        urlPattern: /\/api\/widget\/load(.*)/,
        handler: 'networkFirst',
        options: {
          debug: true,
        },
      }],
    }),
  ].concat(process.env.ANALYSIS ? [new BundleAnalyzerPlugin()] : []).
    concat(process.env.DEAD_CODE ? [new BundleBuddyWebpackPlugin()] : []),
};
