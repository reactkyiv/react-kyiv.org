import superagent from 'superagent';
import config from './../configs/appConfig';

const methods = ['get', 'post', 'put', 'patch', 'del'];

const formatUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (process.env.IS_SERVER) {
    // here could be some another address, no-cors
    return `http://${config.host}:${config.port}/v1/api${adjustedPath}`;
  }

  return `/v1/api${adjustedPath}`;
};

export default class Api {
  constructor(req) {
    methods.forEach((method) => {
      this[method] = (path, { params, data, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (process.env.IS_SERVER && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (headers) {
          request.set(headers);
        }

        if (this.token) {
          request.set('Authorization', `Bearer ${this.token}`);
        }

        if (files) {
          files.forEach((file) => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach((item) => request.field(item.key, item.value));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }

  setJwtToken(token) {
    this.token = token;
  }
}
