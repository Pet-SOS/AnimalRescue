import { API } from './index';

export interface IBankCard{
    cardNumber: string;
    edrpou: string;
    bankName: string;
    firstName: string;
    lastName: string;
}
export interface IInfoCardResponse {
 data: {
    bankCard: IBankCard;
    title: string;
    body: string;
  };
  self?: string;
}

export async function fetchInfoCard(): Promise<IInfoCardResponse> {
    const res = await API.get(`Configurations/donation`);
    return res.data
}