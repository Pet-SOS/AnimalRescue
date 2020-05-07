import {ICustomAppState} from "../../../../../store/state";
import {ILocationsResponse, LocationsCode} from "../../../../../api/admin";
import {ADMIN_LOCATIONS_KEY} from "../reducer";


export const selectLocationState = (state: ICustomAppState, type?: LocationsCode) =>
    type ? state[ADMIN_LOCATIONS_KEY].locations[type] || {} : {};


export const selectAdminLocationsList = (state: ICustomAppState, type?: LocationsCode) : ILocationsResponse =>
    selectLocationState(state, type).list || [];
