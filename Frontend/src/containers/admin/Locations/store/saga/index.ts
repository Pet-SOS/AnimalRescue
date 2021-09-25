import { getType } from 'typesafe-actions';
import { takeEvery } from 'redux-saga/effects';
import {
  actionAdminCreateLocationRequest,
  actionAdminDeleteLocationRequest,
  actionAdminFetchLocationsRequest,
  actionAdminUpdateLocationRequest,
} from '../actions';
import { fetchLocationsSaga } from './fetchLocationSaga';
import {
  createLocationsSaga,
  deleteLocationsSaga,
  editLocationsSaga,
} from './editLocationSaga';

export function* watchAdminLocationSaga() {
  yield takeEvery(
    getType(actionAdminFetchLocationsRequest),
    fetchLocationsSaga,
  );
  yield takeEvery(getType(actionAdminUpdateLocationRequest), editLocationsSaga);
  yield takeEvery(
    getType(actionAdminCreateLocationRequest),
    createLocationsSaga,
  );
  yield takeEvery(
    getType(actionAdminDeleteLocationRequest),
    deleteLocationsSaga,
  );
}
