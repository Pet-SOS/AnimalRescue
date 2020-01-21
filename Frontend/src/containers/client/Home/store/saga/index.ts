import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals, fetchDogs, fetchCats, fetchSavedAnimalsCount} from "../../../../../api/animals";

import {
  actionHomeFetchAnimalsRequest,
  actionHomeFetchAnimalsSuccess,
  actionHomeFetchAnimalsFailure,
  actionHomeFetchDogsRequest,
  actionHomeFetchDogsSuccess,
  actionHomeFetchDogsFailure,
  actionHomeFetchCatsRequest,
  actionHomeFetchCatsSuccess,
  actionHomeFetchCatsFailure,
  actionHomeFetchSavedAnimalsCount, actionHomeFetchSavedAnimalsCountSuccess, actionHomeFetchSavedAnimalsCountFailure
} from "../actions";

function* fetchHomePageAnimalsList() {
    try {
        const response = yield call(fetchAnimals);
        console.log(response)
        yield put(actionHomeFetchAnimalsSuccess(response))
    } catch (e) {
        yield put(actionHomeFetchAnimalsFailure(e))
    }
}

function* fetchHomePageDogsList() {
  try {
    const response = yield call(fetchDogs);
    yield put(actionHomeFetchDogsSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchDogsFailure(e))
  }
}

function* fetchHomePageCatsList() {
  try {
    const response = yield call(fetchCats);
    yield put(actionHomeFetchCatsSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchCatsFailure(e))
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
  yield takeEvery(getType(actionHomeFetchDogsRequest), fetchHomePageDogsList);
  yield takeEvery(getType(actionHomeFetchCatsRequest), fetchHomePageCatsList);
  yield takeEvery(getType(actionHomeFetchSavedAnimalsCount), fetchSavedAnumalsCount)
}