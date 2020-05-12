import {createAction} from "typesafe-actions";
import {IRequestParams} from "../../../../../api/requestOptions";
import {ILocation, LocationsCode} from "../../../../../api/admin";

// List
export const actionAdminFetchLocationsRequest = createAction(
    'ADMIN_FETCH_LOCATIONS_REQUEST',
    (resolve) => (type: LocationsCode, requestParams?: IRequestParams) => resolve({requestParams, type})
);
export const actionAdminFetchLocationsSuccess = createAction(
    'ADMIN_FETCH_LOCATIONS_SUCCESS',
    resolve => (type: LocationsCode, list: any) => resolve({list, type})
);
export const actionAdminFetchLocationsFailure = createAction(
    'ADMIN_FETCH_LOCATIONS_FAILURE',
    (resolve) => (type: LocationsCode, error: Error) => resolve({error, type})
);

// Update / Edit
export const actionAdminUpdateLocationRequest = createAction(
    'ADMIN_UPDATE_LOCATION_REQUEST',
    (resolve) => (location: ILocation) => resolve({location})
);
export const actionAdminUpdateLocationSuccess = createAction(
    'ADMIN_UPDATE_LOCATION_SUCCESS',
    resolve => (location: ILocation) => resolve({location})
);
export const actionAdminUpdateLocationFailure = createAction(
    'ADMIN_UPDATE_LOCATION_FAILURE',
    (resolve) => (location: ILocation, error: Error) => resolve({location, error})
);
