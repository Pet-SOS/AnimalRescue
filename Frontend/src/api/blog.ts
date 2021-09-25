import { API } from './index';
import { IRequestParams, prepareRequestParams, AllTag } from './requestOptions';

export enum BlogTypes {
  BLOG = 'blog',
  ARTICLE = 'article',
  STORY = 'story',
}

export interface IBlogItem {
  type: BlogTypes | string;
  title: string;
  body: string;
  imageIds: string[];
  images?: File[];
  tags: AllTag[];
  createdAt?: string;
  modifiedAt?: string;
  id?: string;
}

export interface IBlogItemResponse {
  data: IBlogItem;
  self: string;
}

export interface IBlogListResponse {
  data: IBlogItem[];
  totalCount: number;
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  self: string;
}

export interface IServerResponseBlogItemCreated {
  data: {
    data: IBlogItem;
  };
  headers: {
    [key: string]: string;
  };
  status: number;
  statusText: string;
}

const mapToBlogRequest = (data: IBlogItem) => {
  const formData = new FormData();
  formData.append('Type', data.type);
  formData.append('Title', data.title);
  formData.append('Body', data.body);
  // @ts-ignore
  for (let img of data.images) {
    formData.append('Images', img);
  }
  for (let imgId of data.imageIds) {
    formData.append('ImageIds', imgId);
  }
  for (let tag of data.tags) {
    formData.append('Tags', tag);
  }
  return formData;
};

export async function fetchBlogList(
  requestParams?: IRequestParams,
): Promise<IBlogListResponse[]> {
  const res = await API.get('blogs', {
    params: prepareRequestParams(requestParams),
  });
  return res.data;
}

export async function fetchBlogItem(id: string): Promise<IBlogItemResponse> {
  const res = await API.get(`blogs/${id}`);
  return res.data;
}

export async function deleteBlogItem(id: string): Promise<void> {
  await API.delete(`blogs/${id}`);
}

export async function updateBlogItem(data: IBlogItem): Promise<void> {
  await API.put(`blogs/${data.id}`, mapToBlogRequest(data));
}

export async function createBlogItem(
  data: IBlogItem,
): Promise<IServerResponseBlogItemCreated> {
  return await API.post(`blogs/`, mapToBlogRequest(data));
}
