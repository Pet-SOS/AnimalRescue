import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals} from "../../../../../api/animals";
import {fetchSickAnimals} from "../../../../../api/help";

import {
    actionHomeFetchAnimalsRequest,
    actionHomeFetchAnimalsSuccess,
    actionHomeFetchAnimalsFailure,
    actionHomeFetchSickAnimals,
    actionHomeFetchSickAnimalsSuccess,
    actionHomeFetchSickAnimalFailUrl
} from "../actions";

function* fetchHomePageAnimalsList() {
    try {
        const response = yield call(fetchAnimals);
        yield put(actionHomeFetchAnimalsSuccess(response))
    } catch (e) {
        yield put(actionHomeFetchAnimalsFailure(e))
    }
}

function* fetchHomePageSickAnimalsList() {
    try {
        const response = yield call(fetchSickAnimals);
        yield put(actionHomeFetchSickAnimalsSuccess(response))
    } catch (e) {
        yield put(actionHomeFetchSickAnimalFailUrl(e))
    }
}


export function* watchHomePage() {
    yield takeEvery(getType(actionHomeFetchAnimalsRequest), fetchHomePageAnimalsList);
    yield takeEvery(getType(actionHomeFetchSickAnimals), fetchHomePageSickAnimalsList);
}