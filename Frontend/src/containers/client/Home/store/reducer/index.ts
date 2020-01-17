import {AnyAction} from "redux";
import {DEFAULT_HOME_PAGE_STATE, IHomePageState} from "../state";
import {getType} from "typesafe-actions";
import {genericRequestReducer} from "../../../../../api";
import {
    actionHomeFetchAnimalsRequest,
    actionHomeFetchAnimalsSuccess,
    actionHomeFetchAnimalsFailure,
    actionIsActivePopup
} from "../actions";

const fetchAnimalsRequestStateReducer = genericRequestReducer(
    actionHomeFetchAnimalsRequest,
    actionHomeFetchAnimalsSuccess,
    actionHomeFetchAnimalsFailure,
    actionIsActivePopup
);

export const homePageReducer = (state:IHomePageState = DEFAULT_HOME_PAGE_STATE, action: AnyAction) => {
    switch (action.type) {

        case getType(actionHomeFetchAnimalsRequest):
            return {
                ...state,
                animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
            };
        case getType(actionHomeFetchAnimalsSuccess):
            return {
                ...state,
                animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action),
                animalsList: action.payload.data
            };
        case getType(actionHomeFetchAnimalsFailure):
            return {
                ...state,
                animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
            };
        case getType(actionIsActivePopup):
            return {
                ...state,
                isActivePopup: action.payload.data
            };

        default:
            return state;
    }
};

export const HOME_PAGE_KEY = 'homePage';