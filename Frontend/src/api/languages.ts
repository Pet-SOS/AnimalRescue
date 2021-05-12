import { API } from './index';

export interface ILanguagesState {
  ua: boolean;
  en: boolean;
  de: boolean;
  ru: boolean;
}

export interface IAvailableLanguages {
  languages: ILanguagesState;
}

export interface IAvailableLanguagesResponse {
  data: IAvailableLanguages;
  self?: string;
}

export async function fetchLanguages(): Promise<IAvailableLanguagesResponse> {
  const res = await API.get('Configurations/languages');
  return res.data;
}

export async function updateLanguages(
  data: IAvailableLanguages,
): Promise<IAvailableLanguagesResponse> {
  const res = await API.put('Configurations/languages', data);
  return res.data;
}