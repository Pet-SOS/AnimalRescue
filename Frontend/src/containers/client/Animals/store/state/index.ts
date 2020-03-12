import { IRequestState, DEFAULT_REQUEST_STATE } from "../../../../../api";
import { IAnimalsResponse, ISavedAnimalsCountResponse } from "../../../../../api/animals";

export const DEFAULT_SAVED_ANIMALS_COUNT: number = 3000;

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
  favoriteAnimalsIds: string[];
  favoriteAnimalsListRequestState: IRequestState;
  favoriteAnimalsList: IAnimalsListState;
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

const getDefaultFavoriteAnimalsIds = (): string[] => {
  const localStorageList = localStorage.getItem('favoriteAnimalsIds');
  return !!localStorageList && Array.isArray(JSON.parse(localStorageList)) ? JSON.parse(localStorageList) : [];
}

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
  favoriteAnimalsIds: getDefaultFavoriteAnimalsIds(),
  favoriteAnimalsList: { ...DEFAULT_ANIMALS },
  favoriteAnimalsListRequestState: { ...DEFAULT_REQUEST_STATE },
};