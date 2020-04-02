import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SearchTree from './SearchTree';
import SearchTree2 from './SearchTree2';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <SearchTree />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
