import { createAction } from 'typesafe-actions';
import { IBlogItem } from '../../../../../api/blog';

export const actionUpdateBlogItemRequest = createAction(
  'UPDATE_BLOG_ITEM_REQUEST',
  resolve => (data: IBlogItem) => resolve(data),
);

export const actionUpdateBlogItemSuccess = createAction(
  'UPDATE_BLOG_ITEM_SUCCESS',
  resolve => (data: IBlogItem) => resolve(data),
);

export const actionUpdateBlogItemFailure = createAction(
  'UPDATE_BLOG_ITEM_FAILURE',
  resolve => (e: Error) => resolve(e),
);

export const actionDeleteBlogItem = createAction(
  'DELETE_BLOG_ITEM',
  resolve => (id: string) => resolve({ id }),
);

export const actionDeleteBlogItemFailure = createAction(
  'DELETE_BLOG_ITEM_FAILURE',
  resolve => (e: Error) => resolve(e),
);
export const actionDeleteBlogItemSuccess = createAction(
  'DELETE_BLOG_ITEM_SUCCESS',
  resolve => (id: string) => resolve(id),
);
