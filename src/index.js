import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './Redux/Store'
import {Provider} from 'react-redux'

ReactDOM.render(
  // wrapping whole application with Provider to have access to store state every where in the app
  <Provider store={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
