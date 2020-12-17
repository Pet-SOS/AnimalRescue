import {
  actionAdminCreateLocationFailure,
  actionAdminCreateLocationRequest,
  actionAdminCreateLocationSuccess,
  actionAdminDeleteLocationFailure,
  actionAdminDeleteLocationRequest,
  actionAdminDeleteLocationSuccess,
  actionAdminFetchLocationsRequest,
  actionAdminUpdateLocationFailure,
  actionAdminUpdateLocationRequest,
  actionAdminUpdateLocationSuccess,
} from '../actions';
import { call, put } from 'redux-saga/effects';
import {
  createLocation,
  deleteLocation,
  LocationsCode,
  updateLocation,
} from '../../../../../api/admin';
import { actionShowSnackbar } from '../../../../../store/actions/snackbar.actions';
import { enumByValue } from '../../../helpers/enumByValue';

export function* editLocationsSaga(
  action: ReturnType<typeof actionAdminUpdateLocationRequest>,
) {
  const location = action.payload.location;
  try {
    yield call(updateLocation, location);
    yield put(actionAdminUpdateLocationSuccess(location));
    yield put(actionShowSnackbar('Location updated successfully'));
  } catch (e) {
    yield put(actionAdminUpdateLocationFailure(location, e));
    yield put(actionShowSnackbar('Error occurred during location update'));
  }
}

export function* createLocationsSaga(
  action: ReturnType<typeof actionAdminCreateLocationRequest>,
) {
  const location = action.payload.location;
  const type = enumByValue(location.typeId, LocationsCode);
  try {
    yield call(createLocation, location);
    yield put(actionAdminCreateLocationSuccess(location));
    yield put(actionAdminFetchLocationsRequest(type));
    yield put(actionShowSnackbar('Location created successfully'));
  } catch (e) {
    yield put(actionAdminCreateLocationFailure(location, e));
    yield put(actionShowSnackbar('Error occurred during location create'));
  }
}

export function* deleteLocationsSaga(
  action: ReturnType<typeof actionAdminDeleteLocationRequest>,
) {
  const location = action.payload.location;
  try {
    yield call(deleteLocation, location);
    yield put(actionAdminDeleteLocationSuccess(location));
    yield put(actionShowSnackbar('Location deleted successfully'));
  } catch (e) {
    yield put(actionAdminDeleteLocationFailure(location, e));
    yield put(actionShowSnackbar('Error occurred during location delete'));
  }
}
