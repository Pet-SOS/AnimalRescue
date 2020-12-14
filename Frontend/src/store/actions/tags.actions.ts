import { createAction } from 'typesafe-actions';

import { ITagsResponse, ITag } from '../../api/tags';
import { IRequestParams } from '../../api/requestOptions';

export const actionGetTagsList = createAction(
  'GET_TAGS_LIST_REQUEST',
  resolve => (requestParams?: IRequestParams) => resolve(requestParams),
);

export const actionGetTagsListSuccess = createAction(
  'GET_TAGS_LIST_SUCCESS',
  resolve => (payload: ITagsResponse) => resolve(payload),
);

export const actionGetTagsListError = createAction(
  'GET_TAGS_LIST_ERROR',
  resolve => (error: Error) => resolve(error),
);

export const actionDeleteTag = createAction(
  'DELETE_TAG_REQUEST',
  resolve => (tagId: string) => resolve(tagId),
);

export const actionDeleteTagSuccess = createAction(
  'DELETE_TAG_SUCCESS',
  resolve => (tagId: string) => resolve(tagId),
);

export const actionDeleteTagError = createAction(
  'DELETE_TAG_ERROR',
  resolve => (error: Error) => resolve(error),
);

export const actionAddTag = createAction(
  'ADD_TAG_REQUEST',
  resolve => (tag: ITag) => resolve(tag),
);

export const actionAddTagSuccess = createAction(
  'ADD_TAG_SUCCESS',
  resolve => (tag: ITag) => resolve(tag),
);

export const actionAddTagError = createAction(
  'ADD_TAG_ERROR',
  resolve => (error: Error) => resolve(error),
);

export const actionUpdateTag = createAction(
  'UPDATE_TAG_REQUEST',
  resolve => (tag: ITag) => resolve(tag),
);

export const actionUpdateTagSuccess = createAction(
  'UPDATE_TAG_SUCCESS',
  resolve => (tag: ITag) => resolve(tag),
);

export const actionUpdateTagError = createAction(
  'UPDATE_TAG_ERROR',
  resolve => (error: Error) => resolve(error),
);

export const actionGetAllTags = createAction(
  'GET_ALL_TAGS_REQUEST',
  resolve => (requestParams?: IRequestParams) => resolve(requestParams),
);

export const actionGetAllTagsSuccess = createAction(
  'GET_ALL_TAGS_SUCCESS',
  resolve => (payload: ITagsResponse) => resolve(payload),
);

export const actionGetAllTagsError = createAction(
  'GET_ALL_TAGS_ERROR',
  resolve => (error: Error) => resolve(error),
);

export const actionClearTagsList = createAction('CLEAR_TAGS_LIST');

export const actionSelectTagsCategory = createAction(
  'SELECT_TAGS_CATEGORY',
  resolve => (category: string) => resolve(category),
);
