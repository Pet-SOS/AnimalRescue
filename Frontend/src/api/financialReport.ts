import { API } from './index';
import { IRequestParams, prepareRequestParams } from './requestOptions';

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
export async function fetchFinancialReport(requestParams?: IRequestParams): Promise<IFinancialReport[]> {
    const res = await API.get(`FinancialReport/years`, { params: prepareRequestParams(requestParams) });
    return res.data
}
export async function fetchFinancialReporDocument(id: string): Promise<any> {
    const res = await API.get(`Documents/${id}`, {responseType: 'arraybuffer'});
    return res
}