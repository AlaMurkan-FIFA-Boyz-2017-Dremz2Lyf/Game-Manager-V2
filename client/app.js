// Dependancies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


// Components
import Home from './components/home';

// Grab our root reducer and our store from their files
import rootReducer from './reducers/index.js';
import { store } from './store';

// Found this... Needed for hot module reloading.
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <Home/>
  </Provider>,
  document.getElementById('app')
);
