import API from './index';

export interface IInfoCard{
 data: {
    bankCard: {
      cardNumber: string;
      edrpou: string;
      bankName: string;
      firstName: string;
      lastName: string;
    };
    title: string;
    body: string;
  };
  self: string;
}

export async function fetchInfoCard(): Promise< IInfoCard> {
    const res = await API.get(`Configurations/donation`);
    return res.data
}