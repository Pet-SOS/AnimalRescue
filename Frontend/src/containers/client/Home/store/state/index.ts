import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';
import { IInfoCardResponse } from './../../../../../api/infoCard';
import { IInfoContactsResponse } from '../../../../../api/contacts';
import { IHelpPopupResponse } from '../../../../../api/help-popup';
import { ITakeHomePopupResponse } from '../../../../../api/takeHomePopup';
import { IHowToAdoptResponse } from '../../../../../api/howToAdopt';
import { IAvailableLanguagesResponse } from '../../../../../api/languages';

export interface IInfoContacts extends IInfoContactsResponse {
  isLoading: boolean;
  isLoaded: boolean;
}
export interface IHelpPopup extends IHelpPopupResponse {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface IInfoCard extends IInfoCardResponse {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface ITakeHomePopupState extends ITakeHomePopupResponse {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface IHowToAdoptState extends IHowToAdoptResponse {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface IAvailableLanguagesState extends IAvailableLanguagesResponse {
    isLoading: boolean;
    isLoaded: boolean;
}

export interface IHomePageState {
  isActivePopup: boolean;
  isActiveTakeHomePopup: boolean;
  infoCardState: IRequestState;
  infoCard: IInfoCard;
  infoContacts: IInfoContacts;
  infoContactsState: IRequestState;
  helpPopup: IHelpPopup;
  helpPopupState: IRequestState;
  takeHomePopup: ITakeHomePopupState;
  takeHomePopupRequestState: IRequestState;
  howToAdopt: IHowToAdoptState;
  howToAdoptRequestState: IRequestState;
  availableLanguages: IAvailableLanguagesState;
  availableLanguagesRequestState: IRequestState;
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
          name: 'popupInfoBlockTitle',
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
          name: 'popupBlockFirstText',
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
        name: 'popupBlockSecondText',
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

export const DEFAULT_TAKE_HOME_POPUP_STATE: ITakeHomePopupState = {
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
}

export const DEFAULT_HOW_TO_ADOPT_STATE: IHowToAdoptState = {
  data: {
    paragraphs: [
      {
          name: 'rulesHowToAdoptTitle',
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
          name: 'rulesHowToAdoptListItemTitle1',
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
        name: 'rulesHowToAdoptListItemText1',
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
      },{
          name: 'rulesHowToAdoptListItemTitle2',
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
        name: 'rulesHowToAdoptListItemText2',
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
        name: 'rulesHowToAdoptListItemTitle3',
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
        name: 'rulesHowToAdoptListItemText3',
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
        name: 'rulesHowToAdoptListItemTitle4',
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
        name: 'rulesHowToAdoptListItemText4',
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
    ]
  },
  isLoading: false,
  isLoaded: false,
}

export const DEFAULT_AVAILABLE_LANGUAGES_STATE: IAvailableLanguagesState = {
  data: {
    languages: {
      ua: true,
      en: true,
      de: true,
      ru: true,
    }      
  },
  isLoading: false,
  isLoaded: false,
} 

export const DEFAULT_HOME_PAGE_STATE: IHomePageState = {
  isActivePopup: false,
  isActiveTakeHomePopup: false,
  infoCardState: { ...DEFAULT_REQUEST_STATE },
  infoCard: { ...DEFAULT_INFO_CARD },
  infoContacts: { ...DEFAULT_CONTACTS },
  infoContactsState: { ...DEFAULT_REQUEST_STATE },
  helpPopup: { ...DEFAULT_HELP_POPUP },
  helpPopupState: { ...DEFAULT_REQUEST_STATE },
  takeHomePopup: { ...DEFAULT_TAKE_HOME_POPUP_STATE },
  takeHomePopupRequestState: { ...DEFAULT_REQUEST_STATE },
  howToAdopt: { ...DEFAULT_HOW_TO_ADOPT_STATE },
  howToAdoptRequestState: { ...DEFAULT_REQUEST_STATE },
  availableLanguages: { ...DEFAULT_AVAILABLE_LANGUAGES_STATE },
  availableLanguagesRequestState: { ...DEFAULT_REQUEST_STATE },
};
