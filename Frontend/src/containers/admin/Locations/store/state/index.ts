import {ILocation, ILocationsResponse} from "../../../../../api/admin";
import {DEFAULT_LIST_RESPONSE, DEFAULT_REQUEST_STATE, IRequestState} from "../../../../../api";

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


export const DEFAULT_LOCATION: ILocation = {
    title: '',
    phoneNumber: '',
    address: '',
    price: '',
    id: '',
    typeId: ''
};

export const DEFAULT_LOCATION_STATE: ILocationState = {
    list: {...DEFAULT_LIST_RESPONSE},
    requestState: {...DEFAULT_REQUEST_STATE}
};

export const DEFAULT_ADMIN_LOCATIONS_STATE: IAdminLocationsSate = {
    locations: {}
};
