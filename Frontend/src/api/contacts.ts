import { API } from './index';

export interface ISocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
}
export interface IEmails {
  animalRescue1?: string;
}
export interface IAddresses {
  country: string;
  town: string;
  street: string;
}

interface IParagraphValue {
  lang: string;
  value: string;
}

export interface IParagraph {
  name: string;
  values: IParagraphValue[]
}

export interface IInfoContactsData {
  socialLinks: ISocialLinks;
  phones: string[];
  emails: IEmails;
  addresses: IAddresses;
  paragraphs: IParagraph[];
}
export interface IInfoContactsResponse {
  data: IInfoContactsData;
  self?: string;
}

export async function fetchInfoContacts(): Promise<IInfoContactsResponse> {
  const res = await API.get(`Configurations/cms`);
  return res.data;
}
export async function addInfoContacts(
  data: IInfoContactsData,
): Promise<IInfoContactsResponse> {
  const res = await API.put(`Configurations/cms`, data);
  return res.data;
}
