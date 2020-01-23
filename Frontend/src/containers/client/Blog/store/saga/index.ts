import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { fetchBlogList } from "../../../../../api/blog";
import {
  actionFetchBlogListSuccess,
  actionFetchBlogListFailure,
  actionFetchBlogListRequest,
  actionFetchBlogListSavedRequest,
  actionFetchBlogListSavedSuccess,
  actionFetchBlogListSavedFailure
} from "../actions";
import { IRequestParams } from '../../../../../api/requestOptions';

function* getBlogList(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchBlogList, action.payload);
    yield put(actionFetchBlogListSuccess(response))
  } catch (e) {
    yield put(actionFetchBlogListFailure(e))
  }
}

function* getBlogListSaved(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchBlogList, action.payload);
    yield put(actionFetchBlogListSavedSuccess(response))
  } catch (e) {
    yield put(actionFetchBlogListSavedFailure(e))
  }
}

export function* watchBlogs() {
  yield takeEvery(getType(actionFetchBlogListRequest), getBlogList);
  yield takeEvery(getType(actionFetchBlogListSavedRequest), getBlogListSaved);
}