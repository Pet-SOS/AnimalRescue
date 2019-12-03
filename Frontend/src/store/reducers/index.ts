import {combineReducers} from "redux";
import {routerReducer } from 'react-router-redux';
export const createReducers = () => {
    return combineReducers({
        routing: routerReducer,
    })
};