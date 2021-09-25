import { createAction } from 'typesafe-actions';
import { IContentPage } from '../../../../../api/contentPages';

export const actionUpdateContentPageRequest = createAction(
  'UPDATE_CONTENT_PAGE_REQUEST',
  resolve => (params: { pageName: string, contentPage: IContentPage }) => resolve(params),
);

export const actionUpdateContentPageSuccess = createAction(
  'UPDATE_CONTENT_PAGE_SUCCESS',
);

export const actionUpdateContentPageFailure = createAction(
  'UPDATE_CONTENT_PAGE_FAILURE',
  resolve => (e: Error) => resolve(e),
);
