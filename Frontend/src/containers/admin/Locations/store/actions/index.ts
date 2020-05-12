import {createAction} from "typesafe-actions";
import {IRequestParams} from "../../../../../api/requestOptions";
import {LocationsCode} from "../../../../../api/admin";

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
