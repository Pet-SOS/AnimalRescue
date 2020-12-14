import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  fetchAnimals,
  fetchSavedAnimalsCount,
  fetchFavoriteAnimals,
} from '../../../../../api/animals';
import { fetchSickAnimals } from '../../../../../api/help';
import {
  actionFetchAnimalsRequest,
  actionFetchAnimalsSuccess,
  actionFetchAnimalsFailure,
  actionFetchDogsRequest,
  actionFetchDogsSuccess,
  actionFetchDogsFailure,
  actionFetchCatsRequest,
  actionFetchCatsSuccess,
  actionFetchCatsFailure,
  actionFetchSavedAnimalsCount,
  actionFetchSavedAnimalsCountSuccess,
  actionFetchSavedAnimalsCountFailure,
  actionFetchSickAnimals,
  actionFetchSickAnimalsSuccess,
  actionFetchSickAnimalFailUrl,
  actionFetchFavoriteAnimalsRequest,
  actionFetchFavoriteAnimalsSuccess,
  actionFetchFavoriteAnimalsFailure,
} from '../actions';
import { IRequestParams } from '../../../../../api/requestOptions';

function* fetchAnimalsList(action: { type: string; payload?: IRequestParams }) {
  try {
    const response = yield call(fetchAnimals, action.payload);
    yield put(actionFetchAnimalsSuccess(response));
  } catch (e) {
    yield put(actionFetchAnimalsFailure(e));
  }
}

function* fetchDogsList(action: { type: string; payload?: IRequestParams }) {
  try {
    const response = yield call(fetchAnimals, action.payload);
    yield put(actionFetchDogsSuccess(response));
  } catch (e) {
    yield put(actionFetchDogsFailure(e));
  }
}
function* fetchSickAnimalsList() {
  try {
    const response = yield call(fetchSickAnimals);
    yield put(actionFetchSickAnimalsSuccess(response));
  } catch (e) {
    yield put(actionFetchSickAnimalFailUrl(e));
  }
}

function* fetchCatsList(action: { type: string; payload?: IRequestParams }) {
  try {
    const response = yield call(fetchAnimals, action.payload);
    yield put(actionFetchCatsSuccess(response));
  } catch (e) {
    yield put(actionFetchCatsFailure(e));
  }
}
function* fetchFavoriteAnimalsList(action: {
  type: string;
  payload: string[];
}) {
  try {
    const response = yield call(fetchFavoriteAnimals, action.payload);
    yield put(actionFetchFavoriteAnimalsSuccess(response));
  } catch (e) {
    yield put(actionFetchFavoriteAnimalsFailure(e));
  }
}

function* getSavedAnimalsCount() {
  try {
    const response = yield call(fetchSavedAnimalsCount);
    yield put(actionFetchSavedAnimalsCountSuccess(response));
  } catch (e) {
    yield put(actionFetchSavedAnimalsCountFailure(e));
  }
}

export function* watchAnimals() {
  yield takeEvery(getType(actionFetchAnimalsRequest), fetchAnimalsList);
  yield takeEvery(getType(actionFetchDogsRequest), fetchDogsList);
  yield takeEvery(getType(actionFetchCatsRequest), fetchCatsList);
  yield takeEvery(getType(actionFetchSavedAnimalsCount), getSavedAnimalsCount);
  yield takeEvery(getType(actionFetchSickAnimals), fetchSickAnimalsList);
  yield takeEvery(
    getType(actionFetchFavoriteAnimalsRequest),
    fetchFavoriteAnimalsList,
  );
}
