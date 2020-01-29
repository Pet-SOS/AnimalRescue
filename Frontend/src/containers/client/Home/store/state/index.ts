import { IRequestState, DEFAULT_REQUEST_STATE } from "../../../../../api";
import { IInfoCard } from './../../../../../api/infoCard';
import { IInfoContacts } from "../../../../../api/contacts";

export interface IHomePageState {
    isActivePopup: boolean;
    infoCardState: IRequestState;
    infoCard: IInfoCard;
    infoContacts: IInfoContacts;
    infoContactsState: IRequestState;
}

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

export const DEFAULT_CONTACTS: IInfoContacts ={
  data: {
    socialLinks: {
      instagram: '',
      facebook: '',
      youtube: '',
    },
    emails:{
      animalRescue1: '',
    },
    addresses: {
      country:'',
      town:'',
      street: '',
    },
    phones: [],
  }
}


export const DEFAULT_HOME_PAGE_STATE: IHomePageState = {
  isActivePopup:  false,
  infoCardState: { ...DEFAULT_REQUEST_STATE},
  infoCard:{...DEFAULT_INFO_CARD},
  infoContacts:{...DEFAULT_CONTACTS},
  infoContactsState: { ...DEFAULT_REQUEST_STATE},
};