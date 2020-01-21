import {AnyAction} from "redux";
import {DEFAULT_HOME_PAGE_STATE, IHomePageState} from "../state";
import {getType} from "typesafe-actions";
import {genericRequestReducer} from "../../../../../api";
import {
    actionHomeFetchAnimalsRequest,
    actionHomeFetchAnimalsSuccess,
    actionHomeFetchAnimalsFailure,
    actionIsActivePopup,
    actionHomeFetchSickAnimals,
    actionHomeFetchSickAnimalsSuccess,
    actionHomeFetchSickAnimalFailUrl
} from "../actions";

const fetchAnimalsRequestStateReducer = genericRequestReducer(
    actionHomeFetchAnimalsRequest,
    actionHomeFetchAnimalsSuccess,
    actionHomeFetchAnimalsFailure,
    actionIsActivePopup,

);

const fetchSickAnimalsRequestStateReducer = genericRequestReducer(
    actionHomeFetchSickAnimalsSuccess,
    actionHomeFetchSickAnimals,
    actionHomeFetchSickAnimalFailUrl
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
        case getType(actionHomeFetchSickAnimals):
            return {
                ...state,
                sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action)
            };
        case getType(actionHomeFetchSickAnimalsSuccess):
            return {
                ...state,
                sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action),
                sickAnimalsList: action.payload.data
            };
        case getType(actionHomeFetchSickAnimalFailUrl):
            return {
                ...state,
                sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action),
            };
        default:
            return state;
    }
};

export const HOME_PAGE_KEY = 'homePage';