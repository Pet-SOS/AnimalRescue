import {API} from '../index'
import {IRequestParams, prepareRequestParams} from '../requestOptions'
import {IListResponse} from "../common";
import { ITag } from '../tags';

const LOCATION_URL = 'Locations';

const locationById = (id: string) => `Locations/${id}`;

const mapLocationToBody = (location: ILocation) => {
    const formData = new FormData();
    // -F "Title=1" -F "Phone=2" -F "Address=3" -F "Price=4" -F "Type=5"
    formData.append('Title', location.title);
    formData.append('Phone', location.phoneNumber);
    formData.append('Address', location.address);
    formData.append('Price', location.price);
    formData.append('Type', location.typeId);
    return formData;
};

const mapResponseToLocation = (response: any) => {
    return {
        ...response,
        typeId: response.type && response.type.id
    }
};

const mapListResponseToLocations = (response: any) => {
    return {
        ...response,
        data: response.data.map((r: any) => mapResponseToLocation(r))
    }
};


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
    typeId: string;
}

export interface ILocationType extends ILocation {
    type: ITag
}

export interface ILocationsResponse extends IListResponse<ILocation> {
}


export async function fetchLocations(requestParams: IRequestParams): Promise<ILocationsResponse> {
    const response = await API.get(LOCATION_URL, {params: prepareRequestParams(requestParams)});
    return mapListResponseToLocations(response.data);
}

export async function fetchLocationById(id: string): Promise<ILocation> {
    const locationResponse = await API.get(locationById(id));
    return mapResponseToLocation(locationResponse.data);
}

export async function updateLocation(location: ILocation): Promise<void> {
    await API.put(locationById(location.id), mapLocationToBody(location));
}

export async function createLocation(location: ILocation): Promise<void> {
    await API.post(locationById(''), mapLocationToBody(location));
}

export async function deleteLocation(location: ILocation): Promise<void> {
    await API.delete(locationById(location.id));
}
