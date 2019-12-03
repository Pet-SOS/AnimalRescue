import {createStore, Middleware, StoreEnhancer, compose, applyMiddleware} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import {createReducers} from './reducers';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import logger from './logger';
import {appSaga} from './saga';

export const history = createBrowserHistory();

const reduxDevToolsEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = process.env.NODE_ENV === 'development' && reduxDevToolsEnhancer ? reduxDevToolsEnhancer : compose;

const sagaMiddleware = createSagaMiddleware();
const reduxLogger = createLogger({ logger });
const customRouterMiddleware = routerMiddleware(history);
const arrMiddleware = [sagaMiddleware, customRouterMiddleware];


if (!process.env.REACT_APP_SHOW_REDUX_LOGS || Number(process.env.REACT_APP_SHOW_REDUX_LOGS)) {
    arrMiddleware.push(reduxLogger);
}
const middleware: Middleware[] = arrMiddleware;
const enhancer: StoreEnhancer<any> = composeEnhancers(applyMiddleware(...middleware));


const store = createStore(createReducers(), {}, enhancer);

sagaMiddleware.run(appSaga);

store.sagaMiddleware = sagaMiddleware;

export {store}