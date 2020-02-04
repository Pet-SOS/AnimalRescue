import API from './index';
import { IRequestParams, prepareRequestParams, AllTag } from './requestOptions';

export enum BlogTypes {BLOG = 'blog', ARTICLE = 'article', STORY = 'story'}

export interface IBlogItem {
  type: BlogTypes | string;
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

export async function fetchBlogItem(id: string): Promise<IBlogItem> {
  const res = await API.get(`blogs/${id}`);
  return res.data
}
