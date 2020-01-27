import { createAction } from 'typesafe-actions';
import { IRequestParams } from '../../../../../api/requestOptions';
import { IArticleListResponse } from './../../../../../api/article';

export const actionFetchArticleListRequest = createAction(
  'FETCH_ARTICLE_LIST_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve(requestParams)
);
export const actionFetchArticleListSuccess = createAction(
  'FETCH_ARTICLE_LIST_SUCCESS',
  (resolve) => (data: IArticleListResponse) => resolve(data)
);
export const actionFetchArticleListFailure = createAction(
  'FETCH_ARTICLE_LIST_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
