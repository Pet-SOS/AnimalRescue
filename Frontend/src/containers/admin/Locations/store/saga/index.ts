import {getType} from "typesafe-actions";
import {takeEvery} from 'redux-saga/effects';
import {actionAdminFetchLocationsRequest, actionAdminUpdateLocationRequest} from "../actions";
import {fetchLocationsSaga} from "./fetchLocationSaga";
import {editLocationsSaga} from "./editLocationSaga";


export function* watchAdminLocationSaga() {
    yield takeEvery(getType(actionAdminFetchLocationsRequest), fetchLocationsSaga);
    yield takeEvery(getType(actionAdminUpdateLocationRequest), editLocationsSaga);
}
