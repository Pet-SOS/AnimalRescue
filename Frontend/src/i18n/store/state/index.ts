export enum ELocales {
    Ru = 'ru',
    En = 'en'
}

export interface II18nState {
    locale: string;
}

export const defaultI18nState = {
    locale: ELocales.Ru
};