import { createAction } from 'typesafe-actions';
import { IInfoContactsResponse } from '../../../../../api/contacts';
import { ITakeHomePopupResponse } from '../../../../../api/takeHomePopup';
import { IHowToAdoptResponse } from '../../../../../api/howToAdopt';
import { IAvailableLanguagesResponse } from '../../../../../api/languages';

export const actionIsActivePopup = createAction(
  'HOME_FETCH_ANIMALS_IS_ACTIVE_POPUP',
  resolve => (data: boolean) => resolve({ data }),
);

export const actionIsActiveTakeHomePopup = createAction(
  'HOME_FETCH_TAKE_HOME_IS_ACTIVE_POPUP',
  resolve => (data: boolean) => resolve({ data }),
);


export const actionFetchInfoCard = createAction('HOME_FETCH_INFO_CARD');
export const actionFetchInfoCardSuccess = createAction(
  'HOME_FETCH_INFO_CARD_SUCCESS',
  resolve => (data: any) => resolve({ data }),
);
export const actionFetchInfoCardlFailUrl = createAction(
  'HOME_FETCH_INFO_CARD_FAILURL',
  resolve => (error: Error) => resolve({ error }),
);
export const actionClearInfoCard = createAction('CLEAR_INFO_CARD');


export const actionFetchInfoContacts = createAction(
  'HOME_FETCH_INFO_CONTACTS',
  resolve => () => resolve({}),
);
export const actionFetchInfoContactsSuccess = createAction(
  'HOME_FETCH_INFO_CONTACTS_SUCCESS',
  resolve => (data: IInfoContactsResponse) => resolve(data),
);
export const actionFetchInfoContactsFailUrl = createAction(
  'HOME_FETCH_INFO_CONTACTS_FAILURL',
  resolve => (error: Error) => resolve({ error }),
);
export const actionClearInfoContacts = createAction('CLEAR_INFO_CONTACTS');


export const actionFetchHelpPopup = createAction(
  'HOME_FETCH_HELP_POPUP',
  resolve => () => resolve({}),
);
export const actionFetchHelpPopupSuccess = createAction(
  'HOME_FETCH_HELP_POPUP_SUCCESS',
  resolve => (data: IInfoContactsResponse) => resolve(data),
);
export const actionFetchHelpPopupFailUrl = createAction(
  'HOME_FETCH_HELP_POPUP_FAILURL',
  resolve => (error: Error) => resolve({ error }),
);
export const actionClearHelpPopup = createAction(
  'CLEAR_HELP_POPUP'
);

export const actionFetchTakeHomePopupRequest = createAction(
  'HOME_FETCH_TAKE_HOME_POPUP_REQUEST',
  resolve => () => resolve(),
);

export const actionFetchTakeHomePopupSuccess = createAction(
  'HOME_FETCH_TAKE_HOME_POPUP_SUCCESS',
  resolve => (data: ITakeHomePopupResponse) => resolve(data),
);

export const actionFetchTakeHomePopupFailure = createAction(
  'HOME_FETCH_TAKE_HOME_POPUP_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

export const actionClearTakeHomePopupState = createAction('CLEAR_TAKE_HOME_POPUP');

export const actionFetchHowToAdoptRequest = createAction(
  'HOME_FETCH_HOW_TO_ADOPT_REQUEST',
  resolve => () => resolve(),
);

export const actionFetchHowToAdoptSuccess = createAction(
  'HOME_FETCH_HOW_TO_ADOPT_SUCCESS',
  resolve => (data: IHowToAdoptResponse) => resolve(data),
);

export const actionFetchHowToAdoptFailure = createAction(
  'HOME_FETCH_HOW_TO_ADOPT_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

export const actionClearHowToAdoptState = createAction('CLEAR_HOW_TO_ADOPT');

export const actionFetchLanguagesRequest = createAction(
  'HOME_FETCH_LANGUAGES_REQUEST',
  resolve => () => resolve(),
);

export const actionFetchLanguagesSuccess = createAction(
  'HOME_FETCH_LANGUAGES_SUCCESS',
  resolve => (data: IAvailableLanguagesResponse) => resolve(data),
);

export const actionFetchLanguagesFailure = createAction(
  'HOME_FETCH_LANGUAGES_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

export const actionClearLanguagesState = createAction('CLEAR_LANGUAGES');
