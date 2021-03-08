import { API } from './index';

interface IParagraphValue {
  lang: string;
  value: string;
}

export interface IParagraph {
  name: string;
  values: IParagraphValue[]
}

export interface IHomePopupData {
  paragraphs: IParagraph[];
}

export interface IHomePopupResponse {
  data: IHomePopupData;
  self?: string;
}

export async function fetchHomePopup(): Promise<IHomePopupResponse> {
  const res = await API.get(`Configurations/home`); // TODO API?
  return res.data;
}

export async function addHomePopup(data: IHomePopupData): Promise<IHomePopupResponse> {
  const res = await API.put(`Configurations/home`, data); // TODO API?
  return res.data;
}
