import { combineReducers } from "redux";
import authReduser from "../reducers/authReduser";
import regUser from "../reducers/regUser";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const rootingReducer = combineReducers({ auth: authReduser, registration: regUser});

const store = createStore(rootingReducer, applyMiddleware(thunk));

export default store;
