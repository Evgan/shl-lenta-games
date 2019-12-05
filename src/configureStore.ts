import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import {routerMiddleware} from 'connected-react-router';
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension';
// If you use react-router, don't forget to pass in your history type.
//add logs for dev
import { createLogger } from 'redux-logger';
// Import the state interface and our combined reducers/sagas.
import { rootSaga, rootReducer } from './redux/saga';
import {createBrowserHistory} from 'history';

const middlewares: any = [];

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger()
    middlewares.push(logger)
}

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any){
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer(history),
        preloadedState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, ...middlewares))
    )

    // Don't forget to run the root saga, and return the store object.
    sagaMiddleware.run(rootSaga);
    return store as any
}
