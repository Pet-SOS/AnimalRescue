import { AnyAction } from 'redux';
import {
  DEFAULT_HOME_PAGE_STATE,
  IHomePageState,
  DEFAULT_CONTACTS,
  DEFAULT_INFO_CARD,
  DEFAULT_HELP_POPUP,
} from '../state';
import { getType } from 'typesafe-actions';
import {
  genericRequestReducer,
  DEFAULT_REQUEST_STATE,
} from '../../../../../api';
import {
  actionIsActivePopup,
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl,
  actionFetchInfoContacts,
  actionFetchInfoContactsSuccess,
  actionFetchInfoContactsFailUrl,
  actionClearInfoContacts,
  actionFetchHelpPopup,
  actionFetchHelpPopupSuccess,
  actionFetchHelpPopupFailUrl,
  actionClearHelpPopup,
  actionClearInfoCard,
} from '../actions';

const fetchSaveInfoCardStateReducer = genericRequestReducer(
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl,
);

const fetchInfoContactsStateReducer = genericRequestReducer(
  actionFetchInfoContacts,
  actionFetchInfoContactsSuccess,
  actionFetchInfoContactsFailUrl,
);

const fetchHelpPopupStateReducer = genericRequestReducer(
  actionFetchHelpPopup,
  actionFetchHelpPopupSuccess,
  actionFetchHelpPopupFailUrl,
);

export const homePageReducer = (
  state: IHomePageState = DEFAULT_HOME_PAGE_STATE,
  action: AnyAction,
): IHomePageState => {
  switch (action.type) {
    case getType(actionFetchInfoCard):
      return {
        ...state,
        infoCard: {
          ...state.infoCard,
          isLoading: true,
        },
        infoCardState: fetchSaveInfoCardStateReducer(
          state.infoCardState,
          action,
        ),
      };
    case getType(actionFetchInfoCardSuccess):
      return {
        ...state,
        infoCardState: fetchSaveInfoCardStateReducer(
          state.infoCardState,
          action,
        ),
        infoCard: {
          ...action.payload.data,
          isLoaded: true,
          isLoading: false,
        },
      };
    case getType(actionFetchInfoCardlFailUrl):
      return {
        ...state,
        infoCard: {
          ...state.infoCard,
          isLoading: false,
          isLoaded: false,
        },
        infoCardState: fetchSaveInfoCardStateReducer(
          state.infoCardState,
          action,
        ),
      };
    case getType(actionIsActivePopup):
      return {
        ...state,
        isActivePopup: action.payload.data,
      };
    case getType(actionClearInfoCard): {
      return {
        ...state,
        infoCard: { ...DEFAULT_INFO_CARD },
        infoCardState: { ...DEFAULT_REQUEST_STATE },
      };
    }
    case getType(actionFetchInfoContacts): {
      return {
        ...state,
        infoContacts: {
          ...state.infoContacts,
          isLoading: true,
        },
        infoContactsState: fetchInfoContactsStateReducer(
          state.infoContactsState,
          action,
        ),
      };
    }
    case getType(actionFetchInfoContactsSuccess): {
      return {
        ...state,
        infoContactsState: fetchInfoContactsStateReducer(
          state.infoContactsState,
          action,
        ),
        infoContacts: {
          ...action.payload,
          isLoading: false,
          isLoaded: true,
        },
      };
    }
    case getType(actionFetchInfoContactsFailUrl): {
      return {
        ...state,
        infoContacts: {
          ...state.infoContacts,
          isLoaded: false,
          isLoading: false,
        },
        infoContactsState: fetchInfoContactsStateReducer(
          state.infoContactsState,
          action,
        ),
      };
    }
    case getType(actionClearInfoContacts): {
      return {
        ...state,
        infoContacts: { ...DEFAULT_CONTACTS },
        infoContactsState: { ...DEFAULT_REQUEST_STATE },
      };
    }
    case getType(actionFetchHelpPopup): {
      return {
        ...state,
        helpPopup: {
          ...state.helpPopup,
          isLoading: true,
        },
        helpPopupState: fetchHelpPopupStateReducer(
          state.helpPopupState,
          action,
        ),
      };
    }
    case getType(actionFetchHelpPopupSuccess): {
      return {
        ...state,
        helpPopupState: fetchHelpPopupStateReducer(
          state.helpPopupState,
          action,
        ),
        helpPopup: {
          ...action.payload,
          isLoading: false,
          isLoaded: true,
        },
      };
    }
    case getType(actionFetchHelpPopupFailUrl): {
      return {
        ...state,
        helpPopup: {
          ...state.helpPopup,
          isLoaded: false,
          isLoading: false,
        },
        helpPopupState: fetchHelpPopupStateReducer(
          state.helpPopupState,
          action,
        ),
      };
    }
    case getType(actionClearHelpPopup): {
      return {
        ...state,
        helpPopup: { ...DEFAULT_HELP_POPUP },
        helpPopupState: { ...DEFAULT_REQUEST_STATE },
      };
    }
    default:
      return state;
  }
};

export const HOME_PAGE_KEY = 'homePage';
