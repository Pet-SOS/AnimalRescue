import {ILocationsResponse} from "../../../../../api/admin";
import {IRequestState} from "../../../../../api";

export interface ILocationState {
    list: ILocationsResponse;
    requestState: IRequestState;
}

export interface ILocationsMap {
    [key: string]: ILocationState
}

export interface IAdminLocationsSate {
    locations: ILocationsMap
}


export const DEFAULT_ADMIN_LOCATIONS_STATE: IAdminLocationsSate = {
    locations: {}
};
