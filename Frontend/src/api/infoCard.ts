import API from './index';
export interface IBankCard{
    cardNumber: string;
    edrpou: string;
    bankName: string;
    firstName: string;
    lastName: string;
}
export interface IInfoCard{
 data: {
    bankCard: IBankCard;
    title: string;
    body: string;
  };
  self?: string;
}

export async function fetchInfoCard(): Promise< IInfoCard> {
    const res = await API.get(`Configurations/donation`);
    return res.data
}