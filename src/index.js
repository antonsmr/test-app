import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));

serviceWorker.unregister();
