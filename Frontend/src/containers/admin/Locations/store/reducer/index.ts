import {AnyAction} from "redux";
import {DEFAULT_ADMIN_LOCATIONS_STATE, DEFAULT_LOCATION_STATE, IAdminLocationsSate, ILocationState} from "../state";
import {getType} from "typesafe-actions";
import {
    actionAdminFetchLocationsFailure,
    actionAdminFetchLocationsRequest,
    actionAdminFetchLocationsSuccess
} from "../actions";

const defaultState = {...DEFAULT_ADMIN_LOCATIONS_STATE};


export const adminLocationsReducer = (state: IAdminLocationsSate = defaultState, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminFetchLocationsRequest):
        case getType(actionAdminFetchLocationsSuccess):
        case getType(actionAdminFetchLocationsFailure):
            const type = action.payload.type;
            return {
                ...state,
                locations: {
                    ...state.locations,
                    [type]: singleLocationReducer(state.locations[type], action)
                }
            };
        default :
            return state;

    }
};


const singleLocationReducer = (state: ILocationState = {...DEFAULT_LOCATION_STATE}, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminFetchLocationsRequest):
        // TODO add request state
        case getType(actionAdminFetchLocationsFailure):
        // TODO add request state
        case getType(actionAdminFetchLocationsSuccess): {
            return {
                ...state,
                list: action.payload.list
            }
        }
        default :
            return state;
    }
};

export const ADMIN_LOCATIONS_KEY = 'adminLocations';

