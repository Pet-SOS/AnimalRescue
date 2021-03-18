import { API } from './index';

interface IParagraphValue {
  lang: string;
  value: string;
}

export interface IParagraph {
  name: string;
  values: IParagraphValue[]
}

export interface IHelpPopupData {
  paragraphs: IParagraph[];
}

export interface IInfoContactsResponse {
  data: IHelpPopupData;
  self?: string;
}

export interface IHelpPopupResponse {
  data: IHelpPopupData;
  self?: string;
}

export async function fetchHelpPopup(): Promise<IHelpPopupResponse> {
  const res = await API.get(`Configurations/adopt-popup`);
  return res.data;
}

export async function addHelpPopup(
  data: IHelpPopupData,
): Promise<IHelpPopupResponse> {
  const res = await API.put(`Configurations/adopt-popup`, data);
  return res.data;
}