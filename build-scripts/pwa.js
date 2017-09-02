import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom/server';
import Html from './../src/helpers/Html';

export default function () {
  return `<!doctype html>${ReactDOM.renderToStaticMarkup(<Html />)}`;
}
