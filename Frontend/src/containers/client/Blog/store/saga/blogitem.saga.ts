import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { fetchBlogItem } from "../../../../../api/blog";
import {
  actionFetchBlogItemRequest,
  actionFetchBlogItemFailure,
  actionFetchBlogItemSuccess
} from '../actions/blogitem.actions';

function* getBlogItem(action: { type: string, payload: string }) {
  try {
    const response = yield call(fetchBlogItem, action.payload);
    yield put(actionFetchBlogItemSuccess(response))
  } catch (e) {
    yield put(actionFetchBlogItemFailure(e))
  }
}

export function* watchBlogItem() {
  yield takeEvery(getType(actionFetchBlogItemRequest), getBlogItem);
}