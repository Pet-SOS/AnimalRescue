export enum ELocales {
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
    locale: ELocales.Ru
};