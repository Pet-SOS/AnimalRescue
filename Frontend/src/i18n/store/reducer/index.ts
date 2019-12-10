import {getType} from "typesafe-actions";
import {AnyAction} from "redux";
import {defaultI18nState, II18nState} from "../state";
import {actionSetLocale} from "../actions";

export function i18nReducer(state: II18nState = defaultI18nState, action: AnyAction) {
    switch (action.type) {
        case getType(actionSetLocale): {
            return {
                ...state,
                locale: action.payload.locale
            }
        }

        default:
            return state;
    }
}