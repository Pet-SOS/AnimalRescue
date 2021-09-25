import { createAction } from 'typesafe-actions';
import { IContentPageResponse } from '../../api/contentPages';

export const actionFetchContentPageRequest = createAction(
  'FETCH_CONTENT_PAGE_REQUEST',
  resolve => (pageName: string) => resolve(pageName), 
);

export const actionFetchContentPageSuccess = createAction(
  'FETCH_CONTENT_PAGE_SUCCESS',
  resolve => (data: IContentPageResponse) => resolve(data),
);

export const actionFetchContentPageFailure = createAction(
  'FETCH_CONTENT_PAGE_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

export const actionClearContentPageState = createAction('CLEAR_CONTENT_PAGE_STATE');