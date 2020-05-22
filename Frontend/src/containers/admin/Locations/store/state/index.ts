import {ILocation, ILocationsResponse} from "../../../../../api/admin";
import {DEFAULT_LIST_RESPONSE, DEFAULT_REQUEST_STATE, IRequestState} from "../../../../../api";
import { DEFAULT_SINGLE_TAG } from '../../../../../store/state/tags.state';
import { ILocationType } from '../../../../../api/admin/locations';

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

export const DEFAULT_SINGLE_LOCATION: ILocationType = {
    title: '',
    phoneNumber: '',
    address: '',
    price: '',
    id: '',
    typeId: '',
    type: DEFAULT_SINGLE_TAG,
}
