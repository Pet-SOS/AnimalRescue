import {getType} from "typesafe-actions";
import {AnyAction} from "redux";
import { defaultI18nState } from "../state";
import {actionSetLocale} from "../actions";

export const APP_LANGUAGE_KEY: string = 'appLanguage';

export function i18nReducer(state: string = defaultI18nState, action: AnyAction) {
  switch (action.type) {
    case getType(actionSetLocale): {
      localStorage.setItem(APP_LANGUAGE_KEY, action.payload)
      return action.payload;
    }
    default: {
      return state;
    }
  }
}