import {API} from '../index'
import {IRequestParams, prepareRequestParams} from '../requestOptions'
import {IListResponse} from "../common";

export enum LocationsCode {
    SHELTER = 'SHELTER',
    CLINIC = 'CLINIK',
    OVEREXPOSURE = 'OVEREXPOSURE'
}

export interface ILocation {
    title: string;
    phoneNumber: string;
    address: string;
    price: string;
    id: string;
}

export interface ILocationsResponse extends IListResponse<Location> {
}


export async function fetchLocations(requestParams: IRequestParams): Promise<ILocationsResponse> {
    const response = await API.get('Locations', {params: prepareRequestParams(requestParams)});
    return response.data;
}
