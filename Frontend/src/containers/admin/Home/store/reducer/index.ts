import {AnyAction} from "redux";
import {DEFAULT_HOME_PAGE_STATE, IHomePageState} from "../state";
import {getType} from "typesafe-actions";
import {genericRequestReducer} from "../../../../../api";
import {
    actionAdminHomeFetchAnimalsRequest,
    actionAdminHomeFetchAnimalsSuccess,
    actionAdminHomeFetchAnimalsFailure,
    actionAdminDeleteAnimalRequest,
    actionAdminDeleteAnimalSuccess,
    actionAdminDeleteAnimalFailure,
    actionAdminPostAnimalRequest,
    actionAdminPostAnimalSuccess,
    actionAdminPostAnimalFailure,
    actionAdminUpdateAnimalRequest,
    actionAdminUpdateAnimalFailure,
    actionAdminUpdateAnimalSuccess
} from "../actions";
import { 
    actionAdminFetchAllLocationsRequest, 
    actionAdminFetchAllLocationsSuccess, 
    actionAdminFetchAllLocationsFailure 
} from "../../../Locations/store";

const fetchAnimalsRequestStateReducer = genericRequestReducer(
    actionAdminHomeFetchAnimalsRequest,
    actionAdminHomeFetchAnimalsSuccess,
    actionAdminHomeFetchAnimalsFailure
);

const postAnimalsRequestStateReducer = genericRequestReducer(
    actionAdminPostAnimalRequest,
    actionAdminPostAnimalSuccess,
    actionAdminPostAnimalFailure
);

const updateAnimalsRequestStateReducer = genericRequestReducer(
    actionAdminUpdateAnimalRequest,
    actionAdminUpdateAnimalSuccess,
    actionAdminUpdateAnimalFailure
);

const deleteAnimalsRequestStateReducer = genericRequestReducer(
    actionAdminDeleteAnimalRequest,
    actionAdminDeleteAnimalSuccess,
    actionAdminDeleteAnimalFailure
);

const fetchAdminHomePageLocationsRequestStateReducer = genericRequestReducer(
    actionAdminFetchAllLocationsRequest,
    actionAdminFetchAllLocationsSuccess,
    actionAdminFetchAllLocationsFailure
);

export const AdminHomePageReducer = (state: IHomePageState = DEFAULT_HOME_PAGE_STATE, action: AnyAction) => {
    switch (action.type) {

        case getType(actionAdminHomeFetchAnimalsRequest):
            return {
                ...state,
                animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
            };
        case getType(actionAdminHomeFetchAnimalsSuccess):
            return {
                ...state,
                animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action),
                animalsList: action.payload.data
            };
        case getType(actionAdminHomeFetchAnimalsFailure):
            return {
                ...state,
                animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
            };


        case getType(actionAdminPostAnimalRequest):
            return {
                ...state,
                animalPostRequestState: postAnimalsRequestStateReducer(state.animalPostRequestState, action)
            };
        case getType(actionAdminPostAnimalSuccess):
            return {
                ...state,
                animalPostRequestState: postAnimalsRequestStateReducer(state.animalPostRequestState, action),
            };
        case getType(actionAdminPostAnimalFailure):
            return {
                ...state,
                animalPostRequestState: postAnimalsRequestStateReducer(state.animalPostRequestState, action)
            };

        case getType(actionAdminUpdateAnimalRequest):
            return {
                ...state,
                animalUpdateRequestState: updateAnimalsRequestStateReducer(state.animalUpdateRequestState, action)
            };
        case getType(actionAdminUpdateAnimalFailure):
            return {
                ...state,
                animalUpdateRequestState: updateAnimalsRequestStateReducer(state.animalUpdateRequestState, action),
            };
        case getType(actionAdminUpdateAnimalSuccess):
            return {
                ...state,
                animalUpdateRequestState: updateAnimalsRequestStateReducer(state.animalUpdateRequestState, action)
            };


        case getType(actionAdminDeleteAnimalRequest):
            return {
                ...state,
                animalDeleteRequestState: deleteAnimalsRequestStateReducer(state.animalDeleteRequestState, action)
            };
        case getType(actionAdminDeleteAnimalSuccess):
            return {
                ...state,
                animalDeleteRequestState: deleteAnimalsRequestStateReducer(state.animalDeleteRequestState, action),
            };
        case getType(actionAdminDeleteAnimalFailure):
            return {
                ...state,
                animalDeleteRequestState: deleteAnimalsRequestStateReducer(state.animalDeleteRequestState, action)
            };


            case getType(actionAdminFetchAllLocationsRequest):
            return {
                ...state,
                requestState: fetchAdminHomePageLocationsRequestStateReducer(state.animalsLocations.requestState, action)
            };
        case getType(actionAdminFetchAllLocationsFailure):
            return {
                ...state,
                requestState: fetchAdminHomePageLocationsRequestStateReducer(state.animalsLocations.requestState, action)
            };
        case getType(actionAdminFetchAllLocationsSuccess): {
            return {
                ...state,
                animalsLocations: action.payload.list,
                requestState: fetchAdminHomePageLocationsRequestStateReducer(state.animalsLocations.requestState, action)
            }
        }

        default:
            return state;
    }
};

export const ADMIN_HOME_PAGE_KEY = 'AdminHomePage';
