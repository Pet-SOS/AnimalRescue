import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  actionGetApiConfig,
  actionGetApiConfigSuccess,
  actionGetApiConfigError,
} from '../actions/config.actions';
import { fetchConfig } from '../../api/config';

function* getConfig() {
  try {
    const response = yield call(fetchConfig);
    yield put(actionGetApiConfigSuccess(response));
  } catch (e) {
    yield put(actionGetApiConfigError(e));
  }
}

export function* watchConfig() {
  yield takeEvery(getType(actionGetApiConfig), getConfig);
}
