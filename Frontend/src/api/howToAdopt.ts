import { API } from './index';

export interface IParagraphValue {
  lang: string;
  value: string;
}

export interface IParagraph {
  name: string;
  values: IParagraphValue[];
}

export interface IHowToAdopt {
  paragraphs: IParagraph[];
}

export interface IHowToAdoptResponse {
  data: IHowToAdopt;
  self?: string;
}

export async function fetchHowToAdopt(): Promise<IHowToAdoptResponse> {
  const res = await API.get('Configurations/how-to-adopt');
  console.log(res);
  return res.data;
}

export async function updateHowToAdopt(
  data: IHowToAdopt,
): Promise<IHowToAdoptResponse> {
  const res = await API.put('Configurations/how-to-adopt', data);
  return res.data;
}