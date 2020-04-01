import { API } from './index'
import { IRequestParams, prepareRequestParams } from './requestOptions'
import { ELocales } from '../i18n/store/state';
import { AnimalKind } from './animals';

export enum TagCategory {
  size = 'size',
  health = 'health',
}

export enum TagCode {
  dogSize = '#dogSize',
  health = '#health',
}

export interface ITagValue {
  lang: ELocales;
  value: string;
}

export interface ITag {
  category: TagCategory | string;
  kindOfAnimal: AnimalKind | string;
  code: TagCode | string;
  values: Array<ITagValue>;
  createdAt?: Date | string;
  id?: string;
}

export interface ITagsResponse {
  data: ITag[]
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  self: string;
  totalCount: number;
}

export async function fetchTags(requestParams?: IRequestParams): Promise<ITagsResponse> {
  const res = await API.get('/WellKnownTag', { params: prepareRequestParams(requestParams) });
  return res.data
}

export async function deleteTagRequest(tagId: string): Promise<void> {
  const res = await API.delete(`/WellKnownTag/${tagId}`);
  return res.data
}