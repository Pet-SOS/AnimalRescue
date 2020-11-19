import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { IRequestParams } from '../../../../../api/requestOptions';
import { fetchArticleList } from '../../../../../api/article';
import {
  actionFetchArticleListRequest,
  actionFetchArticleListSuccess,
  actionFetchArticleListFailure,
} from '../actions';

function* getArticleList(action: { type: string; payload?: IRequestParams }) {
  try {
    const response = yield call(fetchArticleList, action.payload);
    yield put(actionFetchArticleListSuccess(response));
  } catch (e) {
    yield put(actionFetchArticleListFailure(e));
  }
}

export function* watchArticles() {
  yield takeEvery(getType(actionFetchArticleListRequest), getArticleList);
}
