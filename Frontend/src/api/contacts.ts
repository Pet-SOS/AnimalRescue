import { API } from './index';

export interface ISocialLinks{
    instagram: string;
    facebook: string;
    youtube: string;
}
export interface IEmails {
  animalRescue1?: string;
}
export interface IAddresses{
  country:string;
  town:string;
  street:string;
}
export interface IInfoContactsData {
    socialLinks: ISocialLinks;
    phones: string[];
    emails:IEmails;
    addresses: IAddresses;
}
export interface IInfoContactsResponse {
 data: IInfoContactsData;
  self?: string;
}

export async function fetchInfoContacts(): Promise<IInfoContactsResponse> {
    const res = await API.get(`Configurations/cms`);
    return res.data
}
export async function addInfoContacts(data: IInfoContactsData): Promise<IInfoContactsResponse> {
    const res = await API.post(`Configurations/cms`,data);
    return res.data;
}