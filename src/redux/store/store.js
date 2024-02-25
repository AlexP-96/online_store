import { combineReducers } from 'redux';
import regUser from '../reducers/regUser';
import {
    legacy_createStore as createStore,
    applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';
import { userAuth } from '../reducers/userAuth';

const rootingReducer = combineReducers({
    userAuth: userAuth,
    registration: regUser,
});

const store = createStore(rootingReducer, applyMiddleware(thunk));

export default store;
