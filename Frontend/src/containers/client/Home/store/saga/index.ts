import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals, fetchSavedAnimalsCount} from "../../../../../api/animals";

import {actionHomeFetchAnimalsRequest, actionHomeFetchAnimalsSuccess, actionHomeFetchAnimalsFailure, actionHomeFetchSavedAnimalsCount, actionHomeFetchSavedAnimalsCountSuccess, actionHomeFetchSavedAnimalsCountFailure} from "../actions";

function* fetchHomePageAnimalsList() {
    try {
        const response = yield call(fetchAnimals);
        console.log(response)
        yield put(actionHomeFetchAnimalsSuccess(response))
    } catch (e) {
        yield put(actionHomeFetchAnimalsFailure(e))
    }
}

function* fetchSavedAnumalsCount() {
  try {
    const response = yield call(fetchSavedAnimalsCount);
    yield put(actionHomeFetchSavedAnimalsCountSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchSavedAnimalsCountFailure(e))
  }
}


export function* watchHomePage() {
  yield takeEvery(getType(actionHomeFetchAnimalsRequest), fetchHomePageAnimalsList);
  yield takeEvery(getType(actionHomeFetchSavedAnimalsCount), fetchSavedAnumalsCount)
}