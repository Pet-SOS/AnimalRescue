import API from './index';
export interface ISocialLinks{
    instagram: string;
    facebook: string;
    youtube: string;
}
export interface IInfoContactsResponse{
 data: {
    socialLinks: ISocialLinks;
    phones: string[];
  };
  self?: string;
}

export async function fetchInfoContacts(): Promise<IInfoContactsResponse> {
    const res = await API.get(`Configurations/cms`);
    return res.data
}