import {IRequestState, DEFAULT_REQUEST_STATE} from "../../../../../api";
import { IAnimalsResponse, ISavedAnimalsCountResponse} from "../../../../../api/animals";
import { IInfoCard } from "../../../../../api/infoCard";
import { IBlogListResponse } from './../../../../../api/blog';
import { IInfoContacts } from "../../../../../api/contacts";

export interface IHomePageState {
    animalsList: IAnimalsResponse;
    animalsListRequestState: IRequestState;
    blogList: IBlogListResponse;
    blogListRequestState: IRequestState;
    blogListSaved: IBlogListResponse;
    blogListSavedRequestState: IRequestState;
    isActivePopup: boolean;
    sickAnimalsListState:  IRequestState; 
    sickAnimalsList: IAnimalsResponse;
    catsList: IAnimalsResponse;
    catsListRequestState: IRequestState;
    dogsList: IAnimalsResponse;
    dogsListRequestState: IRequestState;
    savedAnimalsCount: ISavedAnimalsCountResponse;
    savedAnimalsCountRequestState: IRequestState;
    infoCardState: IRequestState;
    infoCard: IInfoCard;
    infoContacts: IInfoContacts;
    infoContactsState: IRequestState;
}

export const DEFAULT_ANIMALS = {
    data: [],
    pageCount: 0,
    pageNumber: 0,
    pageSize: 0,
    self: '',
    totalCount: 0
};

export const DEFAULT_INFO_CARD = {
    data: {
       bankCard: {
         cardNumber: '',
         edrpou: '',
         bankName: '',
         firstName: '',
         lastName: '',
       },
       title: '',
       body: '',
     }
}
export const DEFAULT_BLOGS: IBlogListResponse = {
  data: [],
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  totalCount: 0
};

export const DEFAULT_CONTACTS: IInfoContacts ={
  data: {
    socialLinks: {
      instagram: '',
      facebook: '',
      youtube: '',
    },
    phones: [],
  }
}

export const DEFAULT_HOME_PAGE_STATE = {
    animalsList: {...DEFAULT_ANIMALS},
    animalsListRequestState: {...DEFAULT_REQUEST_STATE},
    blogList: {...DEFAULT_BLOGS},
    blogListRequestState: { ...DEFAULT_REQUEST_STATE},
    blogListSaved: {...DEFAULT_BLOGS},
    blogListSavedRequestState: { ...DEFAULT_REQUEST_STATE},
    isActivePopup:  false,
    sickAnimalsList: {...DEFAULT_ANIMALS}, 
    sickAnimalsListState:{...DEFAULT_REQUEST_STATE},
    catsList: {...DEFAULT_ANIMALS},
    catsListRequestState: { ...DEFAULT_REQUEST_STATE },
    dogsList: {...DEFAULT_ANIMALS},
    dogsListRequestState: { ...DEFAULT_REQUEST_STATE },
    savedAnimalsCount: {data: 0, self: ''},
    savedAnimalsCountRequestState: { ...DEFAULT_REQUEST_STATE},
    infoCardState: { ...DEFAULT_REQUEST_STATE},
    infoCard:{...DEFAULT_INFO_CARD},
    infoContacts:{...DEFAULT_CONTACTS},
    infoContactsState: { ...DEFAULT_REQUEST_STATE},
};