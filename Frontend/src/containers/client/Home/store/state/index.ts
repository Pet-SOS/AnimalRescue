import {IRequestState, DEFAULT_REQUEST_STATE} from "../../../../../api";
import {IAnimalsResponse} from "../../../../../api/animals";

export interface IHomePageState {
    animalsList: IAnimalsResponse;
    animalsListRequestState: IRequestState;
    isActivePopup: boolean;
    sickAnimalsListState:  IRequestState; 
    sickAnimalsList: IAnimalsResponse;
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
    isActivePopup:  false,
    sickAnimalsList: {...DEFAULT_ANIMALS}, 
    sickAnimalsListState:{...DEFAULT_REQUEST_STATE}
};