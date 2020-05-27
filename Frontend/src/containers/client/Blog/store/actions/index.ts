import { createAction } from 'typesafe-actions';
import { IRequestParams, RequestFilterOperators, AllTag } from '../../../../../api/requestOptions';
import { IBlogListResponse } from './../../../../../api/blog';

export const actionFetchBlogListRequest = createAction(
  'FETCH_BlOG_LIST_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve(requestParams)
);
export const actionFetchBlogListSuccess = createAction(
  'FETCH_BLOG_LIST_SUCCESS',
  (resolve) => (data: IBlogListResponse) => resolve(data)
);
export const actionFetchBlogListFailure = createAction(
  'FETCH_BLOG_LIST_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);

export const actionFetchBlogListSavedRequest = createAction(
  'FETCH_BlOG_LIST_SAVED_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve({
    ...requestParams,
    filter: {
      fieldName: 'tags',
      operator: RequestFilterOperators.ALL,
      value: AllTag.SAVED
    }
  })
);
export const actionFetchBlogListSavedSuccess = createAction(
  'FETCH_BLOG_LIST_SAVED_SUCCESS',
  (resolve) => (data: IBlogListResponse) => resolve(data)
);
export const actionFetchBlogListSavedFailure = createAction(
  'FETCH_BLOG_LIST_SAVED_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionClearEntireBlogsState = createAction(
  'CLEAR_ENTIRE_BLOG_STATE'
)

export const actionClearBlogListState = createAction(
    'CLEAR_BLOG_LIST_STATE'
);
