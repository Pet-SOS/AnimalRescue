import { IRequestState, DEFAULT_REQUEST_STATE } from "../../../../../api";
import { IAnimalsResponse, ISavedAnimalsCountResponse } from "../../../../../api/animals";

export interface IAnimalsListState extends IAnimalsResponse {
  isLoading: boolean;
  isLoaded: boolean;
}
export interface IAnimalsState {
  animalsList: IAnimalsListState;
  animalsListRequestState: IRequestState;
  sickAnimalsListState: IRequestState;
  sickAnimalsList: IAnimalsListState;
  catsList: IAnimalsListState;
  catsListRequestState: IRequestState;
  dogsList: IAnimalsListState;
  dogsListRequestState: IRequestState;
  savedAnimalsCount: ISavedAnimalsCountResponse;
  savedAnimalsCountRequestState: IRequestState;
}

export const DEFAULT_ANIMALS: IAnimalsListState = {
  data: [],
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  totalCount: 0,
  isLoading: false,
  isLoaded: false
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