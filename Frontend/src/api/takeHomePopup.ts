import { API } from './index';

export interface IParagraphValue {
  lang: string;
  value: string;
}

export interface IParagraph {
  name: string;
  values: IParagraphValue[];
}

export interface ITakeHomePopup {
  paragraphs: IParagraph[];
}

export interface ITakeHomePopupResponse {
  data: ITakeHomePopup;
  self?: string;
}

export async function fetchTakeHomePopup(): Promise<ITakeHomePopupResponse> {
  const res = await API.get('Configurations/adopt-popup');
  return res.data;
}

export async function updateTakeHomePopup(
  data: ITakeHomePopup,
): Promise<ITakeHomePopupResponse> {
  const res = await API.put('Configurations/adopt-popup', data);
  return res.data;
}
