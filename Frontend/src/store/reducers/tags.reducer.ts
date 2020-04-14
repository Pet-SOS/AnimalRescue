import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';

import {
  actionGetTagsList,
  actionGetTagsListSuccess,
  actionGetTagsListError,
  actionClearTagsList,
  actionDeleteTag,
  actionDeleteTagSuccess,
  actionDeleteTagError,
  actionAddTag,
  actionAddTagSuccess,
  actionAddTagError,
  actionGetAllTags,
  actionGetAllTagsSuccess,
  actionGetAllTagsError
} from './../actions/tags.actions';
import { genericRequestReducer } from "../../api";
import { DEFAULT_TAGS_STATE, ITagsState } from '../state/tags.state';
import { ITag } from '../../api/tags';

const tagsListStateReducer = genericRequestReducer(
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
        requestState: tagsListStateReducer(state.requestState, action)
      }
    }
    case getType(actionGetTagsListSuccess):
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isLoaded: true,
        requestState: tagsListStateReducer(state.requestState, action),
      };
    case getType(actionGetTagsListError):
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        requestState: tagsListStateReducer(state.requestState, action)
      };
    case getType(actionDeleteTag): {
      return {
        ...state,
        isLoading: true,
        requestState: tagsListStateReducer(state.requestState, action)
      }
    }
    case getType(actionDeleteTagSuccess): {
      const newTagsList: ITag[] = state.data.filter(tag => tag.id !== action.payload);
      const isDeleted: boolean = newTagsList.length !== state.data.length;
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: newTagsList,
        totalCount: isDeleted ? state.totalCount - 1 : state.totalCount,
        requestState: tagsListStateReducer(state.requestState, action),
      }
    }
    case getType(actionDeleteTagError): {
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        requestState: tagsListStateReducer(state.requestState, action)
      };
    }
    case getType(actionAddTag): {
      return {
        ...state,
        isLoading: true,
        requestState: tagsListStateReducer(state.requestState, action)
      }
    }
    case getType(actionAddTagSuccess): {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: [...state.data, action.payload],
        requestState: tagsListStateReducer(state.requestState, action)
      }
    }
    case getType(actionAddTagError): {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        requestState: tagsListStateReducer(state.requestState, action)
      }
    }
    case getType(actionGetAllTags): {
      return {
        ...state,
        isLoading: true,
        requestState: tagsListStateReducer(state.requestState, action)
      }
    }
    case getType(actionGetAllTagsSuccess):
      const newTagsList: ITag[] = [...state.data, ...action.payload.data];
      return {
        ...state,
        data: newTagsList,
        isLoading: false,
        isLoaded: true,
        requestState: tagsListStateReducer(state.requestState, action),
      };
    case getType(actionGetAllTagsError):
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        requestState: tagsListStateReducer(state.requestState, action)
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
export const ALL_TAGS_KEY = 'tags';