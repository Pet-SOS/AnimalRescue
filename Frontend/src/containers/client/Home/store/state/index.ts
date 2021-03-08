import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';
import { IInfoCardResponse } from './../../../../../api/infoCard';
import { IInfoContactsResponse } from '../../../../../api/contacts';
import { IHelpPopupResponse } from '../../../../../api/help-popup';
import { IHomePopupResponse } from '../../../../../api/home-popup';

export interface IInfoContacts extends IInfoContactsResponse {
  isLoading: boolean;
  isLoaded: boolean;
}
export interface IHelpPopup extends IHelpPopupResponse {
  isLoading: boolean;
  isLoaded: boolean;
}
export interface IHomePopup extends IHomePopupResponse {
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
  helpPopup: IHelpPopup;
  helpPopupState: IRequestState;
  homePopup: IHomePopup;
  homePopupState: IRequestState;
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
    paragraphs: [
      {
          name: 'country',
          values: [
              {
                  lang: 'ua',
                  value: ''
              },
              {
                  lang: 'en',
                  value: ''
              },
              {
                  lang: 'de',
                  value: ''
              },
              {
                  lang: 'ru',
                  value: ''
              }
          ]
      },
      {
          name: 'town',
          values: [
              {
                  lang: 'ua',
                  value: ''
              },
              {
                  lang: 'en',
                  value: ''
              },
              {
                  lang: 'de',
                  value: ''
              },
              {
                  lang: 'ru',
                  value: ''
              }
          ]
      },
      {
          name: 'street',
          values: [
              {
                  lang: 'ua',
                  value: ''
              },
              {
                  lang: 'en',
                  value: ''
              },
              {
                  lang: 'de',
                  value: ''
              },
              {
                  lang: 'ru',
                  value: ''
              }
          ]
      }
    ],
    phones: [],
  },
  isLoading: false,
  isLoaded: false,
};

export const DEFAULT_HELP_POPUP: IHelpPopup = {
  data: {
    paragraphs: [
      {
          name: 'adoptPopupTitle',
          values: [
              {
                  lang: 'ua',
                  value: ''
              },
              {
                  lang: 'en',
                  value: ''
              },
              {
                  lang: 'de',
                  value: ''
              },
              {
                  lang: 'ru',
                  value: ''
              }
          ]
      },
      {
          name: 'adoptPopupText',
          values: [
              {
                  lang: 'ua',
                  value: ''
              },
              {
                  lang: 'en',
                  value: ''
              },
              {
                  lang: 'de',
                  value: ''
              },
              {
                  lang: 'ru',
                  value: ''
              }
          ]
      },
      {
        name: 'adoptPopupText2',
        values: [
            {
                lang: 'ua',
                value: ''
            },
            {
                lang: 'en',
                value: ''
            },
            {
                lang: 'de',
                value: ''
            },
            {
                lang: 'ru',
                value: ''
            }
        ]
    }
    ]
  },
  isLoading: false,
  isLoaded: false,
};

export const DEFAULT_HOME_POPUP: IHomePopup = {
    data: {
      paragraphs: [
        {
            name: 'adoptPopupTitle',
            values: [
                {
                    lang: 'ua',
                    value: ''
                },
                {
                    lang: 'en',
                    value: ''
                },
                {
                    lang: 'de',
                    value: ''
                },
                {
                    lang: 'ru',
                    value: ''
                }
            ]
        },
        {
            name: 'adoptPopupText',
            values: [
                {
                    lang: 'ua',
                    value: ''
                },
                {
                    lang: 'en',
                    value: ''
                },
                {
                    lang: 'de',
                    value: ''
                },
                {
                    lang: 'ru',
                    value: ''
                }
            ]
        },
        {
          name: 'email',
          values: [
              {
                  lang: 'ua',
                  value: ''
              },
              {
                  lang: 'en',
                  value: ''
              },
              {
                  lang: 'de',
                  value: ''
              },
              {
                  lang: 'ru',
                  value: ''
              }
          ]
      }
      ]
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
  helpPopup: { ...DEFAULT_HELP_POPUP },
  helpPopupState: { ...DEFAULT_REQUEST_STATE },
  homePopup: { ...DEFAULT_HOME_POPUP },
  homePopupState: { ...DEFAULT_REQUEST_STATE },
};
