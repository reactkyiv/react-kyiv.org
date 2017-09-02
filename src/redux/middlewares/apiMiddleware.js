export default ({ api }) => ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, types, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...rest, type: REQUEST }); // eslint-disable-line

  const actionPromise = promise({ api }, dispatch);

  actionPromise.then(
    (payload) => next({ ...rest, payload, type: SUCCESS }),
    (error) => next({ ...rest, error, type: FAILURE })
  );

  return actionPromise;
};
