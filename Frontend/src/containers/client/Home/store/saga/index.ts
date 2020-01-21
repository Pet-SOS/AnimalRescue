import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals, fetchSavedAnimalsCount, IAnimalRequestParams} from "../../../../../api/animals";

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

function* fetchHomePageAnimalsList(action: { type: string, payload?: IAnimalRequestParams }) {
    try {
        const response = yield call(fetchAnimals, action.payload);
        console.log(response)
        yield put(actionHomeFetchAnimalsSuccess(response))
    } catch (e) {
        yield put(actionHomeFetchAnimalsFailure(e))
    }
}

function* fetchHomePageDogsList(action: { type: string, payload?: IAnimalRequestParams }) {
  try {
    const response = yield call(fetchAnimals, action.payload);
    yield put(actionHomeFetchDogsSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchDogsFailure(e))
  }
}

function* fetchHomePageCatsList(action: { type: string, payload?: IAnimalRequestParams }) {
  try {
    const response = yield call(fetchAnimals, action.payload);
    yield put(actionHomeFetchCatsSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchCatsFailure(e))
  }
}

function* getSavedAnimalsCount() {
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
  yield takeEvery(getType(actionHomeFetchSavedAnimalsCount), getSavedAnimalsCount)
}