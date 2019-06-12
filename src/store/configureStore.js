import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
import config from '../utils/config';

export default function configureStore() {
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
  });

  const create = () => {
    if (config.env === 'development') {
      return createStore(combinedReducers, composeWithDevTools(
        applyMiddleware(
          thunk,
          logger,
        ),
      ));
    }

    return createStore(combinedReducers, applyMiddleware(thunk));
  };

  const store = create();

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(combinedReducers);
    });
  }

  return store;
}
