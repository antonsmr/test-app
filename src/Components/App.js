import React from 'react';
import { Provider } from 'react-redux';
import { shape } from 'prop-types';
import Router from './Router';

import '../Assets/styles/index.scss';

const App = ({ store }) => (
  <Provider store={store}>
    <Router />
  </Provider>
);

App.propTypes = {
  store: shape().isRequired,
};

export default App;
