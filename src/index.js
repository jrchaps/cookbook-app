import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import normalize from 'normalize.css';
import * as serviceWorker from './serviceWorker';
import { allReducers } from './store/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
 body {
  background: #fafafa;
}
`;

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
