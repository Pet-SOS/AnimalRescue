import { API } from './index';

export interface IDataBankCard {
  body: string;
};
export interface IInfoCardResponse {
  data: IDataBankCard;
  self?: string;
}

export async function fetchInfoCard(): Promise<IInfoCardResponse> {
    const res = await API.get(`Configurations/donation`);
    return res.data
}
export async function addInfoCard(data: any): Promise<IInfoCardResponse> {
    const res = await API.post(`Configurations/donation`,data);
    return res.data;
}