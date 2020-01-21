import {IRequestState, DEFAULT_REQUEST_STATE} from "../../../../../api";
import { IAnimalsResponse, ISavedAnimalsCountResponse} from "../../../../../api/animals";

export interface IHomePageState {
  animalsList: IAnimalsResponse;
  animalsListRequestState: IRequestState;
  catsList: IAnimalsResponse;
  catsListRequestState: IRequestState;
  dogsList: IAnimalsResponse;
  dogsListRequestState: IRequestState;
  savedAnimalsCount: ISavedAnimalsCountResponse;
  savedAnimalsCountRequestState: IRequestState
  isActivePopup: boolean;
}

export const DEFAULT_ANIMALS = {
    data: [],
    pageCount: 0,
    pageNumber: 0,
    pageSize: 0,
    self: '',
    totalCount: 0
};

export const DEFAULT_HOME_PAGE_STATE = {
    animalsList: {...DEFAULT_ANIMALS},
    animalsListRequestState: {...DEFAULT_REQUEST_STATE},
    catsList: {...DEFAULT_ANIMALS},
    catsListRequestState: { ...DEFAULT_REQUEST_STATE },
    dogsList: {...DEFAULT_ANIMALS},
    dogsListRequestState: { ...DEFAULT_REQUEST_STATE },
    savedAnimalsCount: {data: 0, self: null},
    savedAnimalsCountRequestState: { ...DEFAULT_REQUEST_STATE},
    isActivePopup:  false
};