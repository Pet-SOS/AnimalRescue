import { createAction } from 'typesafe-actions';
import { IInfoContactsResponse } from '../../../../../api/contacts';

export const actionIsActivePopup = createAction(
  'HOME_FETCH_ANIMALS_IS_ACTIVE_POPUP',
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
