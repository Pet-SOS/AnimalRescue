import { createAction } from 'typesafe-actions';
import { IOrganizationDocumentsResponse } from '../../api/organizationDocuments';

export const actionFetchOrganizationDocumentsRequest = createAction(
  'FETCH_ORGANIZATIONDOCUMENTS_REQUEST',
  resolve => () => resolve(),
);
export const actionFetchOrganizationDocumentsSuccess = createAction(
  'FETCH_ORGANIZATIONDOCUMENTS_SUCCESS',
  resolve => (data: IOrganizationDocumentsResponse) => resolve(data),
);
export const actionFetchOrganizationDocumentsFailure = createAction(
  'FETCH_ORGANIZATIONDOCUMENTS_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);
export const actionClearOrganizationDocumentsState = createAction(
  'CLEAR_ORGANIZATIONDOCUMENTS_STATE',
);
