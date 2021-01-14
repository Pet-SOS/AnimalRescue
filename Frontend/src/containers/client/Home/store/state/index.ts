import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';
import { IInfoCardResponse } from './../../../../../api/infoCard';
import { IInfoContactsResponse } from '../../../../../api/contacts';

export interface IInfoContacts extends IInfoContactsResponse {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface IInfoCard extends IInfoCardResponse {
  isLoading: boolean;
  isLoaded: boolean;
}

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
  },
  isLoaded: false,
  isLoading: false,
};

export const DEFAULT_CONTACTS: IInfoContacts = {
  data: {
    socialLinks: {
      instagram: '',
      facebook: '',
      youtube: '',
    },
    emails: {
      animalRescue1: '',
    },
    addresses: {
      country: '',
      town: '',
      street: '',
    },
    paragraphs: [],
    phones: [],
  },
  isLoading: false,
  isLoaded: false,
};

export const DEFAULT_HOME_PAGE_STATE: IHomePageState = {
  isActivePopup: false,
  infoCardState: { ...DEFAULT_REQUEST_STATE },
  infoCard: { ...DEFAULT_INFO_CARD },
  infoContacts: { ...DEFAULT_CONTACTS },
  infoContactsState: { ...DEFAULT_REQUEST_STATE },
};
