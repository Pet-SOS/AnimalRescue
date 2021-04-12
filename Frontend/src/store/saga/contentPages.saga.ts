import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { fetchContentPage } from '../../api/contentPages';
import {
  actionFetchContentPageRequest,
  actionFetchContentPageSuccess,
  actionFetchContentPageFailure,
} from '../actions/contentPages.actions';

function* getAboutRules(action: { type: string; payload: string }) {
  try {
    const response = yield call(fetchContentPage, action.payload);
    yield put(actionFetchContentPageSuccess(response));
  } catch (e) {
    yield put(actionFetchContentPageFailure(e));
  }
}

export function* watchContentPage() {
  yield takeEvery(getType(actionFetchContentPageRequest), getAboutRules);
}