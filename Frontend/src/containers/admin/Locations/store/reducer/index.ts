import {AnyAction} from "redux";
import {DEFAULT_ADMIN_LOCATIONS_STATE, IAdminLocationsSate} from "../state";
import {getType} from "typesafe-actions";
import {
    actionAdminFetchLocationsFailure,
    actionAdminFetchLocationsRequest,
    actionAdminFetchLocationsSuccess
} from "../actions";

const defaultState = {...DEFAULT_ADMIN_LOCATIONS_STATE};


export const AdminLocationsReducer = (state: IAdminLocationsSate = defaultState, action: AnyAction) => {
    switch (action.type) {
        case getType(actionAdminFetchLocationsRequest):
        case getType(actionAdminFetchLocationsSuccess):
        case getType(actionAdminFetchLocationsFailure):


        default :
            state;

    }
};
