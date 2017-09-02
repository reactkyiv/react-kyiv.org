/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */
import request from 'superagent';
import superagentMock from 'superagent-mock';
import sinon from 'sinon';
import Api from './Api';

describe('isOnline', () => {
  let api = null;
  let mock = null;

  beforeEach(() => {
    process.env.IS_SERVER = '';
    api = new Api({ get: () => '123', set: sinon.spy() });
  });

  afterEach(() => {
    process.env.IS_SERVER = 1;
    mock.unset();
  });

  it('should send correct post request in browser', () => {
    let actualInput = '';
    let actualBody = '';
    let actualHeaders = '';

    mock = superagentMock(request, [{
      pattern: 'http://localhost:3000',
      fixtures: (match, params, headers) => {
        actualHeaders = headers;
        actualBody = params;
        actualInput = match.input;
      },
      post: (match, data) => ({ body: data }),
    }]);
    const mockedUrl = 'http://localhost:3000/api/someReq';

    api.setJwtToken('somehash');
    api.post(mockedUrl, {
      params: {
        param: '1',
      },
      data: {
        name: 'data',
      },
      headers: {
        some: 'random',
      },
      files: [{ key: 'file', value: 'file' }],
      fields: [{ key: 'field', value: 'field' }],
    });

    expect(actualInput).toBe('/v1/api/http://localhost:3000/api/someReq?param=1');
    expect(actualBody).toEqual({ name: 'data' });
    expect(actualHeaders.Authorization).toBe('Bearer somehash');
    expect(actualHeaders.some).toBe('random');
  });

  it('should send correct post request on server', () => {
    let actualInput = '';
    let actualBody = '';
    let actualHeaders = '';

    mock = superagentMock(request, [{
      pattern: 'http://localhost:3000',
      fixtures: (match, params, headers) => {
        actualHeaders = headers;
        actualBody = params;
        actualInput = match.input;
      },
      post: (match, data) => ({ body: data }),
    }]);
    const mockedUrl = 'http://localhost:3000/api/someReq';

    api.setJwtToken('somehash');
    api.post(mockedUrl, {
      params: {
        param: '1',
      },
      data: {
        name: 'data',
      },
      headers: {
        some: 'random',
      },
      files: [{ key: 'file', value: 'file' }],
      fields: [{ key: 'field', value: 'field' }],
    });

    expect(actualInput).toBe('/v1/api/http://localhost:3000/api/someReq?param=1');
    expect(actualBody).toEqual({ name: 'data' });
    expect(actualHeaders.Authorization).toBe('Bearer somehash');
    expect(actualHeaders.some).toBe('random');
  });

  it('should send correct post request on server', () => {
    process.env.IS_SERVER = 1;
    let actualInput = '';
    let actualBody = '';
    let actualHeaders = '';

    mock = superagentMock(request, [{
      pattern: 'http://localhost:3000',
      fixtures: (match, params, headers) => {
        actualHeaders = headers;
        actualBody = params;
        actualInput = match.input;
      },
      post: (match, data) => ({ body: data }),
    }]);
    const mockedUrl = 'http://localhost:3000/api/someReq';

    api.setJwtToken('somehash');
    api.post(mockedUrl, {
      params: {
        param: '1',
      },
      data: {
        name: 'data',
      },
      headers: {
        some: 'random',
      },
      files: [{ key: 'file', value: 'file' }],
      fields: [{ key: 'field', value: 'field' }],
    });

    expect(actualInput).toBe('http://localhost:undefined/v1/api/http://localhost:3000/api/someReq?param=1');
    expect(actualBody).toEqual({ name: 'data' });
    expect(actualHeaders.Authorization).toBe('Bearer somehash');
    expect(actualHeaders.some).toBe('random');
  });
});
