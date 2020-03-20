import { ILoginPageState, DEFAULT_LOGIN_STATE_PAGE_STATE } from "../state";
import { AnyAction } from "redux";
import { actionAdminLoginRequest, actionAdminLoginRequestSuccess, actionAdminLoginRequestFailure } from "../actions";
import { genericRequestReducer } from "../../../../../api";
import {getType} from "typesafe-actions";

const fetchAdminHomeLoginReducer = genericRequestReducer(
    actionAdminLoginRequest,
    actionAdminLoginRequestSuccess,
    actionAdminLoginRequestFailure
);

export const AdminLoginReducer = (state: ILoginPageState = DEFAULT_LOGIN_STATE_PAGE_STATE, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminLoginRequest):
            return {
                ...state,
                accountSignInRequestState: fetchAdminHomeLoginReducer(state.accountSignInRequestState, action)
            };
        case getType(actionAdminLoginRequestSuccess):
            return {
                ...state,
                accountSignInRequestState: fetchAdminHomeLoginReducer(state.accountSignInRequestState, action),
                accountSignIn: action.payload.data
            };
        case getType(actionAdminLoginRequestFailure):
            return {
                ...state,
                accountSignInRequestState: fetchAdminHomeLoginReducer(state.accountSignInRequestState, action)
            };
        default:
            return state;
    }
};
export const ADMIN_LOGIN_KEY = 'AdminLogin';