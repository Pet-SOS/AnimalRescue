import {
  actionFetchHelpPopup,
  actionFetchInfoCard,
  actionFetchInfoContacts,
} from './../actions/index';
import { IInfoCard } from './../state/index';
import { ICustomAppState } from '../../../../../store/state';
import { HOME_PAGE_KEY } from '../reducer';
import { store } from '../../../../../store';

export const selectSavedInfoCard = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].infoCard;

export const selectInfoContacts = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].infoContacts;
  
export const selectHelpPopup = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].helpPopup;

export const infoCardCheckAndLoad = (): void => {
  const state: IInfoCard = selectSavedInfoCard(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchInfoCard());
  }
};

export const infoContactsCheckAndLoad = (): void => {
  const state: IInfoCard = selectInfoContacts(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchInfoContacts());
  }
};

export const helpPopupCheckAndLoad = (): void => {
  const state: IInfoCard = selectHelpPopup(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchHelpPopup());
  }
};
