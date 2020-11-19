import { createAction } from 'typesafe-actions';
import { IRequestParams } from '../../../../../api/requestOptions';
import { ILocation, LocationsCode } from '../../../../../api/admin';

// List
export const actionAdminFetchLocationsRequest = createAction(
  'ADMIN_FETCH_LOCATIONS_REQUEST',
  resolve => (type: LocationsCode, requestParams?: IRequestParams) =>
    resolve({ requestParams, type }),
);
export const actionAdminFetchLocationsSuccess = createAction(
  'ADMIN_FETCH_LOCATIONS_SUCCESS',
  resolve => (type: LocationsCode, list: any) => resolve({ list, type }),
);
export const actionAdminFetchLocationsFailure = createAction(
  'ADMIN_FETCH_LOCATIONS_FAILURE',
  resolve => (type: LocationsCode, error: Error) => resolve({ error, type }),
);

// Full list
export const actionAdminFetchAllLocationsRequest = createAction(
  'ADMIN_FETCH_ALL_LOCATIONS_REQUEST',
  resolve => (requestParams?: IRequestParams) => resolve({ requestParams }),
);
export const actionAdminFetchAllLocationsSuccess = createAction(
  'ADMIN_FETCH_ALL_LOCATIONS_SUCCESS',
  resolve => (list: any) => resolve({ list }),
);
export const actionAdminFetchAllLocationsFailure = createAction(
  'ADMIN_FETCH_ALL_LOCATIONS_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

// Update / Edit
export const actionAdminUpdateLocationRequest = createAction(
  'ADMIN_UPDATE_LOCATION_REQUEST',
  resolve => (location: ILocation) => resolve({ location }),
);
export const actionAdminUpdateLocationSuccess = createAction(
  'ADMIN_UPDATE_LOCATION_SUCCESS',
  resolve => (location: ILocation) => resolve({ location }),
);
export const actionAdminUpdateLocationFailure = createAction(
  'ADMIN_UPDATE_LOCATION_FAILURE',
  resolve => (location: ILocation, error: Error) =>
    resolve({ location, error }),
);

// Create
export const actionAdminCreateLocationRequest = createAction(
  'ADMIN_CREATE_LOCATION_REQUEST',
  resolve => (location: ILocation) => resolve({ location }),
);
export const actionAdminCreateLocationSuccess = createAction(
  'ADMIN_CREATE_LOCATION_SUCCESS',
  resolve => (location: ILocation) => resolve({ location }),
);
export const actionAdminCreateLocationFailure = createAction(
  'ADMIN_CREATE_LOCATION_FAILURE',
  resolve => (location: ILocation, error: Error) =>
    resolve({ location, error }),
);

// Delete
export const actionAdminDeleteLocationRequest = createAction(
  'ADMIN_DELETE_LOCATION_REQUEST',
  resolve => (location: ILocation) => resolve({ location }),
);
export const actionAdminDeleteLocationSuccess = createAction(
  'ADMIN_DELETE_LOCATION_SUCCESS',
  resolve => (location: ILocation) => resolve({ location }),
);
export const actionAdminDeleteLocationFailure = createAction(
  'ADMIN_DELETE_LOCATION_FAILURE',
  resolve => (location: ILocation, error: Error) =>
    resolve({ location, error }),
);
