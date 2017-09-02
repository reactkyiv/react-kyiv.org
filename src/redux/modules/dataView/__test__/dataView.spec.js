import reducer from './../index';

describe('Check that redux store is created correctly and dataView module works', () => {
  it('should return state when no viewId', () => {
    expect(reducer({ empty: 1 }, { meta: [] })).toEqual({ empty: 1 });
  });

  it('should detect success action and correctly update state', () => {
    expect(reducer({ empty: 1 }, { meta: { viewId: 'WIDGET' }, type: 'LOAD_WIDGETS_SUCCESS' })).toEqual({
      empty: 1,
      WIDGET: {
        isFailed: false,
        isInProgress: false,
        isLoaded: true,
      },
    });
  });

  it('should detect failed action and correctly update state', () => {
    expect(reducer({ empty: 1 }, { meta: { viewId: 'WIDGET' }, type: 'LOAD_WIDGETS_FAILURE' })).toEqual({
      empty: 1,
      WIDGET: {
        isFailed: true,
        isInProgress: false,
        isLoaded: true,
        error: 'Unknown error',
      },
    });
  });

  it('should detect failed action and correctly update state with known error', () => {
    expect(reducer({ empty: 1 }, {
      meta: { viewId: 'WIDGET' },
      type: 'LOAD_WIDGETS_FAILURE',
      payload: { response: { errorMessage: 'bla' } },
    })).toEqual({
      empty: 1,
      WIDGET: {
        isFailed: true,
        isInProgress: false,
        isLoaded: true,
        error: 'bla',
      },
    });
  });
});
