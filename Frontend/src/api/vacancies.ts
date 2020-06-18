import { API } from './index'
import { IRequestParams, prepareRequestParams } from './requestOptions/index';

export interface IVacancy {
  name: string;
  description: string;
  createdAt: string;
  id?: string;
}

export interface IVacanciesResponse {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  data: IVacancy[];
  self: string;
}

export async function fetchVacancies(requestParams?: IRequestParams): Promise<IVacanciesResponse> {
  const res = await API.get('vacancies', { params: prepareRequestParams(requestParams) });
  return res.data
}