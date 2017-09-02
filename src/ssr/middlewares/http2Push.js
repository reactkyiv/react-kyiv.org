/* istanbul ignore next */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

/* istanbul ignore next */
const prepareAssets = (pathToStatic) => {
  if (process.env.NODE_ENV !== 'production') {
    return {};
  }

  const assets = webpackIsomorphicTools.assets();

  return {
    js: Object.keys(assets.javascript).map((name) => {
      const file = fs.readFileSync(path.join(pathToStatic, assets.javascript[name])); // eslint-disable-line

      return {
        name,
        path: assets.javascript[name],
        dataToResponse: zlib.gzipSync(file), // eslint-disable-line
      };
    }),
    css: Object.keys(assets.styles).map((name) => {
      const file = fs.readFileSync(path.join(pathToStatic, assets.styles[name])); // eslint-disable-line

      return {
        name,
        path: assets.styles[name],
        dataToResponse: zlib.gzipSync(file), // eslint-disable-line
      };
    }),
  };
};

const http2Push = (pathToStatic) => {
  const assets = prepareAssets(pathToStatic);

  return (req, res, next) => {
    if (req.isSpdy && res.push && process.env.NODE_ENV === 'production') {
      const headers = {
        'content-type': 'application/javascript',
        'accept-encoding': 'gzip',
        'Content-Encoding': 'gzip',
      };
      const options = {
        status: 200,
        method: 'GET',
        request: {
          accept: '*/*',
        },
        response: {
          ...headers,
        },
      };

      assets.js.forEach((asset) => {
        res.
          push(asset.path, options).
          end(asset.dataToResponse);
      });
      assets.css.forEach((asset) => {
        res.
          push(asset.path, { ...options, response: { ...headers, 'content-type': 'text/css' } }).
          end(asset.dataToResponse);
      });
    }

    res.status(200);

    next();
  };
};

export default http2Push;
