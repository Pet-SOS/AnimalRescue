import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';
import { IArticleListResponse } from '../../../../../api/article';

export interface IArticlesState {
  articleList: IArticleListResponse;
  articleListRequestState: IRequestState;
}

export const DEFAULT_ARTICLES: IArticleListResponse = {
  data: [],
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  totalCount: 0,
};

export const DEFAULT_ARTICLES_STATE: IArticlesState = {
  articleList: { ...DEFAULT_ARTICLES },
  articleListRequestState: { ...DEFAULT_REQUEST_STATE },
};
