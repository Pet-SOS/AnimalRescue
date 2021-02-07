import {
  actionAdminLoginRequest,
  actionAdminLoginRequestSuccess,
  actionAdminLoginRequestFailure,
} from '../actions';
import { fetchlogin, IResponceSignIn } from '../../../../../api/login';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { history } from '../../../../../store';

function* postLoginSaga(action: { type: string; payload?: IResponceSignIn }) {
  try {
    const response = yield call(fetchlogin, action.payload);
    yield put(actionAdminLoginRequestSuccess(response));
  } catch (e) {
    yield put(actionAdminLoginRequestFailure(e));
  }
}

function redirectAfterLoginSaga() {
  history.push('/admin');
}

export function* watchLoginRequestHomePage() {
  yield takeEvery(getType(actionAdminLoginRequest), postLoginSaga);
  yield takeEvery(
    getType(actionAdminLoginRequestSuccess),
    redirectAfterLoginSaga,
  );
}
