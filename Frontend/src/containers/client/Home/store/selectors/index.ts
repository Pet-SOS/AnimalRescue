import {
  actionFetchHelpPopup,
  actionFetchInfoCard,
  actionFetchInfoContacts,
  actionFetchTakeHomePopupRequest,
  actionFetchHowToAdoptRequest,
  actionFetchLanguagesRequest,
} from './../actions/index';
import {
  IInfoCard,
  ITakeHomePopupState,
  IHowToAdoptState,
  IAvailableLanguagesState,
} from './../state/index';
import { ICustomAppState } from '../../../../../store/state';
import { HOME_PAGE_KEY } from '../reducer';
import { store } from '../../../../../store';

export const selectSavedInfoCard = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].infoCard;

export const selectInfoContacts = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].infoContacts;
  
export const selectHelpPopup = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].helpPopup;

export const selectTakeHomePopup = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].takeHomePopup;

export const selectHowToAdopt = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].howToAdopt;

export const selectAvailableLanguages = (state: ICustomAppState) =>
  state[HOME_PAGE_KEY].availableLanguages;

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

export const takeHomePopupCheckAndLoad = (): void => {
  const state: ITakeHomePopupState = selectTakeHomePopup(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchTakeHomePopupRequest());
  }
};

export const howToAdoptCheckAndLoad = (): void => {
  const state: IHowToAdoptState = selectHowToAdopt(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchHowToAdoptRequest());
  }
};

export const availableLanguagesCheckAndLoad = (): void => {
  const state: IAvailableLanguagesState = selectAvailableLanguages(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchLanguagesRequest());
  }
};
