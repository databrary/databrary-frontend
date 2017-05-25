/**
 * Created by maksim on 5/15/17.
 */


import {createBrowserHistory} from "history";
import {combineReducers, createStore} from "redux";
import {routerReducer, syncHistoryWithStore} from "react-router-redux";

import appReducer from "./reducers";

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        appReducer,
        routing: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createBrowserHistory(), store);

export {store, history}

