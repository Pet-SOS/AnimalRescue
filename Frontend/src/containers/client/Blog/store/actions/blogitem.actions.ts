import { createAction } from 'typesafe-actions';
import { IBlogItem } from '../../../../../api/blog';

export const actionFetchBlogItemRequest = createAction(
  'FETCH_BlOG_ITEM_REQUEST',
  (resolve) => (id: string) => resolve(id)
);
export const actionFetchBlogItemSuccess = createAction(
  'FETCH_BLOG_ITEM_SUCCESS',
  (resolve) => (data: IBlogItem) => resolve(data)
);
export const actionFetchBlogItemFailure = createAction(
  'FETCH_BLOG_ITEM_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionClearBlogItemState = createAction(
  'CLEAR_BLOG_ITEM_STATE'
);