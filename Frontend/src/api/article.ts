import { API } from './index';
import { IRequestParams, prepareRequestParams, AllTag } from './requestOptions';
import { BlogTypes } from './blog';

export interface IArticleItem {
  type: BlogTypes;
  title: string;
  body: string;
  imageIds: string[];
  tags: AllTag[];
  createdAt?: string;
  id?: string;
}

export interface IArticleListResponse {
  data: IArticleItem[];
  totalCount: number;
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  self: string;
}

export async function fetchArticleList(
  requestParams?: IRequestParams,
): Promise<IArticleListResponse[]> {
  const res = await API.get(`blogs`, {
    params: prepareRequestParams(requestParams),
  });
  return res.data;
}
