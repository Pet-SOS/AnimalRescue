import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals} from "../../../../../api/animals";

import {
    actionAdminHomeFetchAnimalsRequest,
    actionAdminHomeFetchAnimalsSuccess,
    actionAdminHomeFetchAnimalsFailure
} from "../actions";

function* fetchHomePageAnimalsList() {
    try {
        const response = yield call(fetchAnimals);
        yield put(actionAdminHomeFetchAnimalsSuccess(response))
    } catch (e) {
        yield put(actionAdminHomeFetchAnimalsFailure(e))
    }
}


export function* watchAdminHomePage() {
    yield takeEvery(getType(actionAdminHomeFetchAnimalsRequest), fetchHomePageAnimalsList)
}
