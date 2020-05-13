import {API} from '../index'
import {IRequestParams, prepareRequestParams} from '../requestOptions'
import {IListResponse} from "../common";
import { ITag } from '../tags';

export enum LocationsCode {
    SHELTER = 'SHELTER',
    CLINIC = 'CLINIC',
    OVEREXPOSURE = 'OVEREXPOSURE'
}

export interface ILocation {
    title: string;
    phoneNumber: string;
    address: string;
    price: string;
    id: string;
}

export interface ILocationType extends ILocation {
    type: ITag
}

export interface ILocationsResponse extends IListResponse<ILocation> {
}


export async function fetchLocations(requestParams: IRequestParams): Promise<ILocationsResponse> {
    const response = await API.get('Locations', {params: prepareRequestParams(requestParams)});
    return response.data;
}
