import { genericRequestReducer } from '../../api';
import {
  actionFetchOrganizationDocumentsRequest,
  actionFetchOrganizationDocumentsSuccess,
  actionFetchOrganizationDocumentsFailure,
  actionClearOrganizationDocumentsState,
} from '../actions/organizationDocuments.actions';
import {
  IOrganizationDocumentsState,
  DEFAULT_ORGANIZATIONDOCUMENTS_STATE,
} from '../state/organizationDocuments.state';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';

const fetchOrganizationDocumentsStateReducer = genericRequestReducer(
  actionFetchOrganizationDocumentsRequest,
  actionFetchOrganizationDocumentsSuccess,
  actionFetchOrganizationDocumentsFailure,
);

export const organizationDocumentsReducer = (
  state: IOrganizationDocumentsState = DEFAULT_ORGANIZATIONDOCUMENTS_STATE,
  action: AnyAction,
): IOrganizationDocumentsState => {
  switch (action.type) {
    case getType(actionFetchOrganizationDocumentsRequest): {
      return {
        ...state,
        isLoading: true,
        requestState: fetchOrganizationDocumentsStateReducer(
          state.requestState,
          action,
        ),
      };
    }
    case getType(actionFetchOrganizationDocumentsSuccess):
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isLoaded: true,
        requestState: fetchOrganizationDocumentsStateReducer(
          state.requestState,
          action,
        ),
      };
    case getType(actionFetchOrganizationDocumentsFailure):
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        requestState: fetchOrganizationDocumentsStateReducer(
          state.requestState,
          action,
        ),
      };
    case getType(actionClearOrganizationDocumentsState): {
      return {
        ...DEFAULT_ORGANIZATIONDOCUMENTS_STATE,
      };
    }
    default:
      return state;
  }
};

export const ORGANIZATION_DOCUMENTS_KEY = 'organizationDocuments';
