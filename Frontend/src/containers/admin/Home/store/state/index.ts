import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';
import { IAnimalsResponse } from '../../../../../api/animals';
import {
  DEFAULT_LOCATION_STATE,
  ILocationState,
} from '../../../Locations/store/state/index';

export interface IHomePageState {
  animalsList: IAnimalsResponse;
  animalsListRequestState: IRequestState;
  animalDeleteRequestState: IRequestState;
  animalPostRequestState: IRequestState;
  animalUpdateRequestState: IRequestState;
  animalsLocations: ILocationState;
}

export const DEFAULT_ANIMALS = {
  data: [],
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  totalCount: 0,
};

export const DEFAULT_HOME_PAGE_STATE = {
  animalsList: { ...DEFAULT_ANIMALS },
  animalsListRequestState: { ...DEFAULT_REQUEST_STATE },
  animalDeleteRequestState: { ...DEFAULT_REQUEST_STATE },
  animalPostRequestState: { ...DEFAULT_REQUEST_STATE },
  animalUpdateRequestState: { ...DEFAULT_REQUEST_STATE },
  animalsLocations: { ...DEFAULT_LOCATION_STATE },
};
