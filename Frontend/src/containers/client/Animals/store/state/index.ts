import { IRequestState, DEFAULT_REQUEST_STATE } from "../../../../../api";
import { IAnimalsResponse, ISavedAnimalsCountResponse } from "../../../../../api/animals";

export interface IAnimalsState {
  animalsList: IAnimalsResponse;
  animalsListRequestState: IRequestState;
  sickAnimalsListState: IRequestState;
  sickAnimalsList: IAnimalsResponse;
  catsList: IAnimalsResponse;
  catsListRequestState: IRequestState;
  dogsList: IAnimalsResponse;
  dogsListRequestState: IRequestState;
  savedAnimalsCount: ISavedAnimalsCountResponse;
  savedAnimalsCountRequestState: IRequestState;
}

export const DEFAULT_ANIMALS: IAnimalsResponse = {
  data: [],
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  totalCount: 0
};

export const DEFAULT_ANIMALS_STATE: IAnimalsState = {
  animalsList: { ...DEFAULT_ANIMALS },
  animalsListRequestState: { ...DEFAULT_REQUEST_STATE },
  sickAnimalsList: { ...DEFAULT_ANIMALS },
  sickAnimalsListState: { ...DEFAULT_REQUEST_STATE },
  catsList: { ...DEFAULT_ANIMALS },
  catsListRequestState: { ...DEFAULT_REQUEST_STATE },
  dogsList: { ...DEFAULT_ANIMALS },
  dogsListRequestState: { ...DEFAULT_REQUEST_STATE },
  savedAnimalsCount: { data: 0, self: '' },
  savedAnimalsCountRequestState: { ...DEFAULT_REQUEST_STATE },
};