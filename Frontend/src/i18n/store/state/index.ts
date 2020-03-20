import { APP_LANGUAGE_KEY } from "../reducer";

export const getDefaultLocale = (): ELocales => {
  const useLocale: string = (localStorage.getItem(APP_LANGUAGE_KEY) || window.navigator.language.slice(0, 2)).toLowerCase();
  const matchedLocale: ELocales = ELocales[useLocale as keyof typeof ELocales];
  return !!matchedLocale ? matchedLocale : ELocales.ua;
}

export enum ELocales {
  ua = 'ua',
  en = 'en',
  de = 'de',
  ru = 'ru',
}

export interface ILocales {
    key: string;
    value: string;
}

export const locales = Object.entries(ELocales).map(([key, value]): ILocales => ({ key, value }));

export const defaultI18nState: ELocales = getDefaultLocale();