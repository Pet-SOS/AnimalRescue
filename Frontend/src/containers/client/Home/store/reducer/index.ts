import {AnyAction} from "redux";
import {DEFAULT_HOME_PAGE_STATE, IHomePageState} from "../state";
import {getType} from "typesafe-actions";
import {genericRequestReducer} from "../../../../../api";
import {
  actionIsActivePopup,
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl,
  actionFetchInfoContacts,
  actionFetchInfoContactsSuccess,
  actionFetchInfoContactsFailUrl,
} from "../actions";

const fetchSaveInfoCardStateReducer = genericRequestReducer(
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl
)

const fetchInfoContactsStateReducer = genericRequestReducer(
  actionFetchInfoContacts,
  actionFetchInfoContactsSuccess,
  actionFetchInfoContactsFailUrl
)

export const homePageReducer = (state: IHomePageState = DEFAULT_HOME_PAGE_STATE, action: AnyAction): IHomePageState => {
  switch (action.type) {
    case getType(actionFetchInfoCard):
      return {
        ...state,
        infoCardState: fetchSaveInfoCardStateReducer(state.infoCardState, action)
      };
    case getType(actionFetchInfoCardSuccess):
      return {
        ...state,
        infoCardState: fetchSaveInfoCardStateReducer(state.infoCardState, action),
        infoCard: action.payload.data
      };
    case getType(actionFetchInfoCardlFailUrl):
      return {
        ...state,
        infoCardState: fetchSaveInfoCardStateReducer(state.infoCardState, action),
      };
    case getType(actionIsActivePopup):
      return {
        ...state,
        isActivePopup: action.payload.data
      };
    case getType(actionFetchInfoCard):
      return {
        ...state,
        infoCardState: fetchSaveInfoCardStateReducer(state.infoCardState, action)
      };
    case getType(actionFetchInfoCardSuccess):
      return {
        ...state,
        infoCardState: fetchSaveInfoCardStateReducer(state.infoCardState, action),
        infoCard: action.payload.data
      };
    case getType(actionFetchInfoCardlFailUrl):
      return {
        ...state,
        infoCardState: fetchSaveInfoCardStateReducer(state.infoCardState, action),
      };
    case getType(actionFetchInfoContacts): {
      return {
        ...state,
        infoContactsState: fetchInfoContactsStateReducer(state.infoContactsState, action)
      }
    }
    case getType(actionFetchInfoContactsSuccess):
      return {
        ...state,
        infoContactsState: fetchInfoContactsStateReducer(state.infoContactsState, action),
        infoContacts: action.payload
      };
    case getType(actionFetchInfoContactsFailUrl):
      return {
        ...state,
        infoContactsState: fetchInfoContactsStateReducer(state.infoContactsState, action)
      };
    default:
        return state;
  }
};

export const HOME_PAGE_KEY = 'homePage';