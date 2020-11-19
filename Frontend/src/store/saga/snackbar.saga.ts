import { takeEvery, put, delay } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import {
  actionShowSnackbar,
  actionHideSnackbar,
} from './../actions/snackbar.actions';

function* onShowSnackbar() {
  yield delay(3000);
  yield put(actionHideSnackbar());
}

export function* watchSnackbar() {
  yield takeEvery(getType(actionShowSnackbar), onShowSnackbar);
}
