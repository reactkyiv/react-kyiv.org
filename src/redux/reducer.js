import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import widgets from './modules/widgets';
import dataView from './modules/dataView';

export default function createReducers(asyncReducers) {
  return {
    routing: routerReducer,
    reduxAsyncConnect,
    widgets,
    dataView,
    ...asyncReducers,
  };
}
