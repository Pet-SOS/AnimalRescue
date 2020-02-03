import API from './index';
import { IRequestParams, prepareRequestParams, AllTag, BlogTags } from './requestOptions';
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
const params = {
  Filter: `type~eq~('${BlogTags.story}')`
}
export async function fetchArticleList(requestParams?: IRequestParams): Promise<IArticleListResponse[]> {
  const res = await API.get(`Blogs`, { params });
  return res.data
}
