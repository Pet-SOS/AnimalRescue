import { API } from './index';
import { IRequestParams, prepareRequestParams } from './requestOptions';
import { ELocales } from '../i18n/store/state';
import { AnimalKind } from './animals';

export enum TagCategory {
  dogSize = 'dogsize',
  health = 'health',
  kindOfAnimal = 'kindOfAnimal',
  location = 'location',
}

export enum EKindOfAnimal {
  dog = 'DOG',
}

export interface ITagValue {
  lang: ELocales;
  value: string;
}

export interface ITag {
  category: TagCategory | string;
  kindOfAnimal: AnimalKind | string;
  values: Array<ITagValue>;
  createdAt?: Date | string;
  isDeletable?: boolean;
  id?: string;
}

export interface ITagsResponse {
  data: ITag[];
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  self: string;
  totalCount: number;
}

export async function fetchTags(
  requestParams?: IRequestParams,
): Promise<ITagsResponse> {
  const res = await API.get('/WellKnownTag', {
    params: prepareRequestParams(requestParams),
  });
  return res.data;
}

export async function addTagRequest(
  tag: ITag,
): Promise<{ data: ITag; self: string }> {
  const res = await API.post('/WellKnownTag', tag);
  return res.data;
}

export async function updateTagRequest(tag: ITag): Promise<void> {
  await API.put(`/WellKnownTag/${tag.id}`, tag);
}

export async function deleteTagRequest(tagId: string): Promise<void> {
  const res = await API.delete(`/WellKnownTag/${tagId}`);
  return res.data;
}
