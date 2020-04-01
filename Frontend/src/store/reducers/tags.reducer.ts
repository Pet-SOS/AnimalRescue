import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';

import {
  actionGetTagsList,
  actionGetTagsListSuccess,
  actionGetTagsListError,
  actionClearTagsList
} from './../actions/tags.actions';
import { genericRequestReducer } from "../../api";
import { DEFAULT_TAGS_STATE, ITagsState } from '../state/tags.state';

const fetchTagsListStateReducer = genericRequestReducer(
  actionGetTagsList,
  actionGetTagsListSuccess,
  actionGetTagsListError
)

export const tagsReducer = (state: ITagsState = DEFAULT_TAGS_STATE, action: AnyAction): ITagsState => {
  switch (action.type) {
    case getType(actionGetTagsList): {
      return {
        ...state,
        isLoading: true,
        requestState: fetchTagsListStateReducer(state.requestState, action)
      }
    }
    case getType(actionGetTagsListSuccess):
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isLoaded: true,
        requestState: fetchTagsListStateReducer(state.requestState, action),
      };
    case getType(actionGetTagsListError):
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        requestState: fetchTagsListStateReducer(state.requestState, action)
      };
    case getType(actionClearTagsList): {
      return {
        ...DEFAULT_TAGS_STATE
      }
    }
    default:
      return state;
  }
}

export const TAGS_KEY = 'tags';