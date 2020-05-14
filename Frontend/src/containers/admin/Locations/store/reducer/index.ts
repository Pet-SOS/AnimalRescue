import {AnyAction} from "redux";
import {DEFAULT_ADMIN_LOCATIONS_STATE, DEFAULT_LOCATION_STATE, IAdminLocationsSate, ILocationState} from "../state";
import {getType} from "typesafe-actions";
import {
    actionAdminDeleteLocationFailure,
    actionAdminDeleteLocationRequest, actionAdminDeleteLocationSuccess,
    actionAdminFetchLocationsFailure,
    actionAdminFetchLocationsRequest,
    actionAdminFetchLocationsSuccess,
    actionAdminUpdateLocationFailure,
    actionAdminUpdateLocationRequest,
    actionAdminUpdateLocationSuccess
} from "../actions";
import {genericRequestReducer} from "../../../../../api";

const defaultState = {...DEFAULT_ADMIN_LOCATIONS_STATE};


export const adminLocationsReducer = (state: IAdminLocationsSate = defaultState, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminFetchLocationsRequest):
        case getType(actionAdminFetchLocationsSuccess):
        case getType(actionAdminFetchLocationsFailure):
            const loadListType = action.payload.type;
            return {
                ...state,
                locations: {
                    ...state.locations,
                    [loadListType]: singleLocationReducer(state.locations[loadListType], action)
                }
            };
        case getType(actionAdminUpdateLocationRequest):
        case getType(actionAdminUpdateLocationSuccess):
        case getType(actionAdminUpdateLocationFailure):
            const updateType = action.payload.location.typeId;
            return {
                ...state,
                locations: {
                    ...state.locations,
                    [updateType]: locationUpdate(state.locations[updateType], action)
                }
            };
        case getType(actionAdminDeleteLocationRequest):
        case getType(actionAdminDeleteLocationSuccess):
        case getType(actionAdminDeleteLocationFailure):
            const deleteType = action.payload.location.typeId;
            return {
                ...state,
                locations: {
                    ...state.locations,
                    [deleteType]: locationDelete(state.locations[deleteType], action)
                }
            };
        default :
            return state;

    }
};

const fetchAdminLocationRequestStateReducer = genericRequestReducer(
    actionAdminFetchLocationsRequest,
    actionAdminFetchLocationsSuccess,
    actionAdminFetchLocationsFailure
);

const singleLocationReducer = (state: ILocationState = {...DEFAULT_LOCATION_STATE}, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminFetchLocationsRequest):
            return {
                ...state,
                requestState: fetchAdminLocationRequestStateReducer(state.requestState, action)
            };
        case getType(actionAdminFetchLocationsFailure):
            return {
                ...state,
                requestState: fetchAdminLocationRequestStateReducer(state.requestState, action)
            };
        case getType(actionAdminFetchLocationsSuccess): {
            return {
                ...state,
                list: action.payload.list,
                requestState: fetchAdminLocationRequestStateReducer(state.requestState, action)
            }
        }
        default :
            return state;
    }
};


const locationUpdate = (state: ILocationState = {...DEFAULT_LOCATION_STATE}, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminUpdateLocationSuccess):
            const list = [...state.list.data || []].map(location => action.payload.location.id === location.id ? action.payload.location : location);
            return {
                ...state,
                list: {
                    ...state.list,
                    data: list,
                }
            };
        case getType(actionAdminUpdateLocationRequest):
        case getType(actionAdminUpdateLocationFailure):
        default :
            return state;
    }
};

const locationDelete = (state: ILocationState = {...DEFAULT_LOCATION_STATE}, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminDeleteLocationSuccess):
            const list = (state.list.data || []).filter(location => action.payload.location.id !== location.id);
            return {
                ...state,
                list: {
                    ...state.list,
                    data: list,
                }
            };
        case getType(actionAdminDeleteLocationRequest):
        case getType(actionAdminDeleteLocationFailure):
        default :
            return state;
    }
};

export const ADMIN_LOCATIONS_KEY = 'adminLocations';

