import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { genericRequestReducer } from '../../../../../api';
import { DEFAULT_ARTICLES_STATE, IArticlesState } from './../state';
import {
  actionFetchArticleListRequest,
  actionFetchArticleListSuccess,
  actionFetchArticleListFailure,
} from '../actions';

const fetchArticleListStateReducer = genericRequestReducer(
  actionFetchArticleListRequest,
  actionFetchArticleListSuccess,
  actionFetchArticleListFailure,
);

export const articlesReducer = (
  state: IArticlesState = DEFAULT_ARTICLES_STATE,
  action: AnyAction,
): IArticlesState => {
  switch (action.type) {
    case getType(actionFetchArticleListRequest):
      return {
        ...state,
        articleListRequestState: fetchArticleListStateReducer(
          state.articleListRequestState,
          action,
        ),
      };
    case getType(actionFetchArticleListSuccess):
      return {
        ...state,
        articleListRequestState: fetchArticleListStateReducer(
          state.articleListRequestState,
          action,
        ),
        articleList: action.payload,
      };
    case getType(actionFetchArticleListFailure):
      return {
        ...state,
        articleListRequestState: fetchArticleListStateReducer(
          state.articleListRequestState,
          action,
        ),
      };
    default:
      return state;
  }
};

export const ARTICLES_KEY = 'articles';
