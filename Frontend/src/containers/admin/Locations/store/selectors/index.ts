import {ICustomAppState} from "../../../../../store/state";
import {ILocationsResponse, LocationsCode} from "../../../../../api/admin";
import {ADMIN_LOCATIONS_KEY} from "../reducer";
import {ILocationState} from "../state";


export const selectLocationState = (state: ICustomAppState, type?: LocationsCode) : ILocationState =>
    type ? state[ADMIN_LOCATIONS_KEY].locations[type] || {} : {};


export const selectAdminLocationsList = (state: ICustomAppState, type?: LocationsCode) : ILocationsResponse =>
    selectLocationState(state, type).list || [];
