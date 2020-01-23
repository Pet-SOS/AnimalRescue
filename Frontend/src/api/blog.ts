import API from './index';
import { IRequestParams, prepareRequestParams, AllTag } from './requestOptions';

export enum BlogTypes {BLOG = 'blog', ARTICLE = 'article', STORY = 'story'}

export interface IBlogItem {
  type: BlogTypes;
  title: string;
  body: string;
  imageIds: string[];
  tags: AllTag[];
  createdAt?: string;
  id?: string;
}

export interface IBlogListResponse {
  data: IBlogItem[];
  totalCount: number;
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  self: string;
}

export async function fetchBlogList(requestParams?: IRequestParams): Promise<IBlogListResponse[]> {
  const res = await API.get('blogs', { params: prepareRequestParams(requestParams) });
  return res.data
}