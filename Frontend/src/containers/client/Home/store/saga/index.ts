import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals} from "../../../../../api/animals";

import {actionHomeFetchAnimalsRequest, actionHomeFetchAnimalsSuccess, actionHomeFetchAnimalsFailure} from "../actions";

function* fetchHomePageAnimalsList() {
    try {
        const response = yield call(fetchAnimals);
        console.log(response)
        yield put(actionHomeFetchAnimalsSuccess(response))
    } catch (e) {
        yield put(actionHomeFetchAnimalsFailure(e))
    }
}


export function* watchHomePage() {
    yield takeEvery(getType(actionHomeFetchAnimalsRequest), fetchHomePageAnimalsList)
}