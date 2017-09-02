import { spy } from 'sinon';
import apiMiddleware from './apiMiddleware';

describe('Api middleware', () => {
  it('should correctly handle action which is function, by calling it', () => {
    const action = () => ({ id: 1 });
    const dispatch = () => {};
    const getState = () => {};
    const next = spy();
    const result = apiMiddleware({})({ dispatch, getState })(next)(action);

    expect(result).toEqual({ id: 1 });
    expect(next.calledOnce).toBeFalsy();
  });

  it('should correctly handle action as object without promise', () => {
    const action = { id: 1 };
    const dispatch = () => {};
    const getState = () => {};
    const next = spy();

    apiMiddleware({})({ dispatch, getState })(next)(action);

    expect(next.calledOnce).toBeTruthy();
  });

  it('should correctly handle action as object with promise', (done) => {
    const action = { id: 1, promise: () => Promise.resolve({ id: 2 }), types: ['START', 'SUCCESS', 'FAILURE'] };
    const dispatch = () => {};
    const getState = () => {};
    const next = spy();

    apiMiddleware({})({ dispatch, getState })(next)(action);

    expect(next.calledOnce).toBeTruthy();
    setTimeout(() => {
      expect(next.calledTwice).toBeTruthy();
      expect(next.args[1][0]).toEqual({ id: 1, payload: { id: 2 }, type: 'SUCCESS' });
      done();
    });
  });

  it('should correctly handle action as object with promise reject', (done) => {
    const action = { id: 1, promise: () => Promise.reject({ id: 2 }), types: ['START', 'SUCCESS', 'FAILURE'] };
    const dispatch = () => {};
    const getState = () => {};
    const next = spy();

    apiMiddleware({})({ dispatch, getState })(next)(action);

    expect(next.calledOnce).toBeTruthy();
    setTimeout(() => {
      expect(next.calledTwice).toBeTruthy();
      expect(next.args[1][0]).toEqual({ id: 1, error: { id: 2 }, type: 'FAILURE' });
      done();
    });
  });
});
