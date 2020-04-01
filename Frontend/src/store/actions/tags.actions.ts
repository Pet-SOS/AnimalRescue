import { createAction } from 'typesafe-actions';

import { ITagsResponse } from '../../api/tags';
import { IRequestParams } from '../../api/requestOptions';

export const actionGetTagsList = createAction(
  'GET_TAGS_LIST_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve(requestParams)
);

export const actionGetTagsListSuccess = createAction(
  'GET_TAGS_LIST_SUCCESS',
  (resolve) => (payload: ITagsResponse) => resolve(payload)
);

export const actionGetTagsListError = createAction(
  'GET_TAGS_LIST_ERROR',
  (resolve) => (error: Error) => resolve(error)
);

export const actionClearTagsList = createAction(
  'CLEAR_TAGS_LIST'
)