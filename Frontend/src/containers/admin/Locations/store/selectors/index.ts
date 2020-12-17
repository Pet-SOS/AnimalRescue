import { ICustomAppState } from '../../../../../store/state';
import { ILocationsResponse, LocationsCode } from '../../../../../api/admin';
import { ADMIN_LOCATIONS_KEY } from '../reducer';
import { ILocationState } from '../state';
import { ERequestStatus, IRequestState } from '../../../../../api';

export const selectLocationState = (
  state: ICustomAppState,
  type?: LocationsCode,
): ILocationState =>
  type ? state[ADMIN_LOCATIONS_KEY].locations[type] || {} : {};

export const selectAdminLocationsList = (
  state: ICustomAppState,
  type?: LocationsCode,
): ILocationsResponse => selectLocationState(state, type).list || [];

export const isLoadingAdminLocations = (
  state: ICustomAppState,
  type?: LocationsCode,
): boolean =>
  isLoadingRequestState(selectLocationState(state, type).requestState);

export const isLoadingRequestState = (requestState?: IRequestState) =>
  !!requestState &&
  (ERequestStatus.NONE === requestState.status ||
    ERequestStatus.REQUEST === requestState.status);
