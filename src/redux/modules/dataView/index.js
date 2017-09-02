const getErrorMessage = (action) => {
  const { payload } = action;
  const error = payload && payload.response && payload.response.errorMessage;

  return error || 'Unknown error';
};

const isStartAction = (action) => action.type.indexOf('_START') !== -1;
const isSuccessAction = (action) => action.type.indexOf('_SUCCESS') !== -1;

const updateLoadingViewId = (state, action) => {
  const { viewId } = action.meta;

  if (!viewId) {
    return state;
  }

  if (isStartAction(action)) {
    const nextState = {
      [viewId]: {
        isInProgress: true,
        isFailed: false,
        isLoaded: false,
      },
    };

    return { ...state, ...nextState };
  }

  if (isSuccessAction(action)) {
    const nextState = {
      [viewId]: {
        isInProgress: false,
        isFailed: false,
        isLoaded: true,
      },
    };

    return { ...state, ...nextState };
  }

  const nextState = {
    [viewId]: {
      isInProgress: false,
      isFailed: true,
      isLoaded: true,
      error: getErrorMessage(action),
    },
  };

  return { ...state, ...nextState };
};

export default (state = {}, action) => {
  if (!action.meta) {
    return state;
  }

  return updateLoadingViewId(state, action);
};
