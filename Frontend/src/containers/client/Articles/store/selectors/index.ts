import { ICustomAppState } from '../../../../../store/state';
import { ARTICLES_KEY } from '../reducer';

export const selectArticleList = (state: ICustomAppState) =>
  state[ARTICLES_KEY].articleList;
//export const selectArticleList = (state: ICustomAppState) => state[ARTICLES_KEY].getArticleList;
