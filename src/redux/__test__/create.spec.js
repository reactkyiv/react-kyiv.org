import createStore, { inject } from './../create';

describe('Check that redux store is created correctly', () => {
  it('should create store correctly', () => {
    const store = createStore({}, {}, {});

    expect(store.asyncReducers).toBeTruthy();
    expect(store.dispatch).toBeTruthy();
    expect(store.getState).toBeTruthy();
    expect(store.inject).toBeTruthy();
    expect(store.replaceReducer).toBeTruthy();
    expect(store.getState()).toEqual({
      routing: { locationBeforeTransitions: null },
      reduxAsyncConnect: { loaded: false, loadState: {} },
      widgets: { data: [] },
      dataView: {},
    });
  });

  it('should add missed reducers', () => {
    const store = createStore({}, {}, { widgets: { data: [1] } });

    expect(store.getState()).toEqual({
      routing: { locationBeforeTransitions: null },
      reduxAsyncConnect: { loaded: false, loadState: {} },
      widgets: { data: [1] },
      dataView: {},
    });
  });

  it('should dispatch LOAD_WIDGETS_SUCCESS and receve correct update', () => {
    const store = createStore({}, {}, {});

    store.dispatch({ type: 'LOAD_WIDGETS_SUCCESS', payload: [1, -1] });

    expect(store.getState()).toEqual({
      routing: { locationBeforeTransitions: null },
      reduxAsyncConnect: { loaded: false, loadState: {} },
      widgets: { data: [1, -1] },
      dataView: {},
    });
  });

  it('should correctly inject reducers', () => {
    const store = createStore({}, {}, {});

    store.dispatch({ type: 'LOAD_WIDGETS_SUCCESS', payload: [1, -1] });
    inject(store, 'asyncReducerInjected', () => -1);

    expect(store.getState()).toEqual({
      routing: { locationBeforeTransitions: null },
      asyncReducerInjected: -1,
      reduxAsyncConnect: { loaded: false, loadState: {} },
      widgets: { data: [1, -1] },
      dataView: {},
    });
  });

  it('should not inject reducer if it already injected', () => {
    const store = createStore({}, {}, {});

    store.dispatch({ type: 'LOAD_WIDGETS_SUCCESS', payload: [1, -1] });
    store.asyncReducers = { routing: true }; // eslint-disable-line
    inject(store, 'routing', {});

    expect(store.getState()).toEqual({
      routing: { locationBeforeTransitions: null },
      reduxAsyncConnect: { loaded: false, loadState: {} },
      widgets: { data: [1, -1] },
      dataView: {},
    });
  });
});
