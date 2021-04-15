import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { genericRequestReducer } from '../../api';
import {
  actionFetchContentPageRequest,
  actionFetchContentPageSuccess,
  actionFetchContentPageFailure,
  actionClearContentPageState,
} from '../actions/contentPages.actions';
import {
  IContentPageState,
  DEFAULT_CONTENT_PAGE_STATE,
} from '../state/contentPages.state';

const fetchContentPageStateReducer = genericRequestReducer(
  actionFetchContentPageRequest,
  actionFetchContentPageSuccess,
  actionFetchContentPageFailure,
);

export const contentPageReducer = (
  state: IContentPageState = DEFAULT_CONTENT_PAGE_STATE,
  action: AnyAction,
): IContentPageState => {
  switch (action.type) {
    case getType(actionFetchContentPageRequest): {
      return {
        ...state,
        requestState: fetchContentPageStateReducer(state.requestState, action),
        isLoading: true,
      };
    }
    case getType(actionFetchContentPageSuccess): {
      return {
        ...state,
        ...action.payload,
        requestState: fetchContentPageStateReducer(state.requestState, action),
        isLoading: false,
        isLoaded: true,
      };
    }
    case getType(actionFetchContentPageFailure): {
      return {
        ...state,
        requestState: fetchContentPageStateReducer(state.requestState, action),
        isLoading: false,
        isLoaded: false,
      };
    }
    case getType(actionClearContentPageState): {
      return {
        ...DEFAULT_CONTENT_PAGE_STATE,
      };
    }
    default: {
      return state;
    }
  }
};

export const CONTENT_PAGE_KEY = 'contentPage';