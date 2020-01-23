import API from './index';
export interface ISocialLinks{
    instagram: string;
    facebook: string;
    youtube: string;
}
export interface IInfoContacts{
 data: {
    socialLinks: ISocialLinks;
    phones: string[];
  };
  self?: string;
}

export async function fetchInfoContacts(): Promise< IInfoContacts> {
    const res = await API.get(`Configurations/cms`);
    return res.data
}