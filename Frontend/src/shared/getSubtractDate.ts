import moment from 'moment';

export enum ESubtractPeriod {
  Month = 'month',
  Years = 'years'
}

export const getSubtractDate = (amount: number, unit: ESubtractPeriod): string => {
  return moment().startOf('day').subtract(amount, unit).toISOString();
}
