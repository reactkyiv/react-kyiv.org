import reducer from './../index';

describe('Check widgets module', () => {
  it('should return state when no viewId', () => {
    expect(reducer({ empty: 1 })).toEqual({ empty: 1 });
  });
});
