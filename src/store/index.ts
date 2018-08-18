import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { reducers } from 'store/reducers';
import { State } from 'store/states';

const middleware: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export const store: Store<State> = createStore(reducers, applyMiddleware(...middleware));
