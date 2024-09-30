import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Use correct import for redux-thunk in Vite
import characterReducer from '../reducers/characterReducer';

// Extend the window object with the Redux DevTools compose function
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    characterReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
