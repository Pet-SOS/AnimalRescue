import API from './index';
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

export interface IInfoContacts{
 data: {
    socialLinks: ISocialLinks;
    phones: string[];
    emails:IEmails;
    addresses: IAddresses;
  };
  self?: string;
}

export async function fetchInfoContacts(): Promise<IInfoContactsResponse> {
    const res = await API.get(`Configurations/cms`);
    return res.data
}