import { AnyAction } from "redux";
import { getType } from "typesafe-actions";
import {
  actionFetchBlogItemRequest,
  actionFetchBlogItemSuccess,
  actionFetchBlogItemFailure,
  actionClearBlogItemState
} from '../actions/blogitem.actions';
import { IBlogItemState, DEFAULT_BLOG_ITEM_STATE } from '../state/blogitem.state';
import { genericRequestReducer } from "../../../../../api";

const fetchBlogItemStateReducer = genericRequestReducer(
  actionFetchBlogItemRequest,
  actionFetchBlogItemSuccess,
  actionFetchBlogItemFailure,
)

export const blogItemReducer = (state: IBlogItemState = DEFAULT_BLOG_ITEM_STATE, action: AnyAction): IBlogItemState => {
  switch (action.type) {
    case getType(actionFetchBlogItemRequest): {
      return {
        ...state,
        requestState: fetchBlogItemStateReducer(state.requestState, action),
        isLoading: true
      }
    };
    case getType(actionFetchBlogItemSuccess): {
      return {
        ...state,
        ...action.payload,
        requestState: fetchBlogItemStateReducer(state.requestState, action),
        isLoading: false,
        isLoaded: true,
      }
    };
    case getType(actionFetchBlogItemFailure): {
      return {
        ...state,
        requestState: fetchBlogItemStateReducer(state.requestState, action),
        isLoading: false,
        isLoaded: false,
      }
    };
    case getType(actionClearBlogItemState): {
      return {
        ...DEFAULT_BLOG_ITEM_STATE
      }
    };
    default: {
      return state;
    }
  }
}

export const BLOG_ITEM_KEY = 'blogItem';