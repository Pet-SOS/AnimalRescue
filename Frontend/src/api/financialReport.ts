import API from './index';
import { IRequestParams } from './requestOptions';

export interface IInfoFile {
  title: string;
  body: string;
  fileId: string;
  date: Date;
  createdAt: string;
  modifiedAt: null | string;
  createdBy: null | string;
  modifiedBy: null | string;
  id: string;
}
export interface IFinancialReport {
  date: string;
  reports: IInfoFile[];
}
export async function fetchFinancialReport(
  requestParams?: IRequestParams,
): Promise<IFinancialReport[]> {
  const res = await API.get(`FinancialReport/years`);
  return res.data;
}
export async function fetchFinancialReporDocument(id: string): Promise<any> {
  const res = await API.get(`Documents/${id}`, { responseType: 'arraybuffer' });
  return res;
}
export async function deleteFinancialReporDocument(id: string): Promise<any> {
  const res = await API.delete(`FinancialReport/${id}`);
  return res;
}
export async function addFinancialReporDocument(report?: any): Promise<any> {
  const res = await API.post(`FinancialReport`, report);
  return res.data;
}
