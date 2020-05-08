import {getType} from "typesafe-actions";
import {takeEvery} from 'redux-saga/effects';
import {actionAdminFetchLocationsRequest} from "../actions";
import {fetchLocationsSaga} from "./fetchLocationSaga";


export function* watchAdminLocationSaga() {
    yield takeEvery(getType(actionAdminFetchLocationsRequest), fetchLocationsSaga);
}
