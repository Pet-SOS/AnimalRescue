import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { actionShowSnackbar } from '../../../../../store/actions/snackbar.actions';
import {
  actionUpdateContentPageRequest,
  actionUpdateContentPageSuccess,
  actionUpdateContentPageFailure,
} from '../actions';
import { updateContentPage } from '../../../../../api/contentPages';

export function* updateContentPageSaga(
  action: ReturnType<typeof actionUpdateContentPageRequest>,
) {
  const requestData = action.payload;
  try {
    yield call(updateContentPage, requestData);
    yield put(actionUpdateContentPageSuccess());
  } catch (e) {
    yield put(actionUpdateContentPageFailure(e));
  }
}

export function* watchUpdateContentPageSaga() {
  yield takeEvery(getType(actionUpdateContentPageRequest), updateContentPageSaga);
}