import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchSickAnimals} from "../../../../../api/help";
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
  actionHomeFetchSavedAnimalsCount,
  actionHomeFetchSavedAnimalsCountSuccess,
  actionHomeFetchSavedAnimalsCountFailure,
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
  yield takeEvery(getType(actionHomeFetchSavedAnimalsCount), fetchSavedAnumalsCount);
  yield takeEvery(getType(actionHomeFetchSickAnimals), fetchHomePageSickAnimalsList);
}