export enum ELocales {
  Ua = 'ua',
  En = 'en',
  De = 'de',
  Ru = 'ru',
}

export interface ILocales {
    key: string;
    value: string;
}

export const locales = Object.entries(ELocales).map(([key, value]): ILocales => ({key: key, value: value}));

export interface II18nState {
    locale: string;
}

export const defaultI18nState = {
    locale: ELocales.Ua
};