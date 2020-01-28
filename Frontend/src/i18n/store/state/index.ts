export enum ELocales {
  Ua = 'ua',
  Ru = 'ru',
  En = 'en'
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