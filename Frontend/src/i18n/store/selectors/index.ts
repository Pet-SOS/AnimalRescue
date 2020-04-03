import { APP_LANGUAGE_KEY } from './../reducer/index';
import { ICustomAppState } from "../../../store/state";

export const selectAppLanguage = (state: ICustomAppState): string => state[APP_LANGUAGE_KEY];