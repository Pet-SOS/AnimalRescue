import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals, fetchSavedAnimalsCount} from "../../../../../api/animals";
import { fetchBlogList } from "../../../../../api/blog";
import {fetchSickAnimals} from "../../../../../api/help";
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
  actionHomeFetchSickAnimalFailUrl,
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl,
  actionHomeFetchBlogListSuccess,
  actionHomeFetchBlogListFailure,
  actionHomeFetchBlogListRequest
} from "../actions";
import { fetchInfoCard } from '../../../../../api/infoCard';
import { IRequestParams } from '../../../../../api/requestOptions';

function* fetchHomePageAnimalsList(action: { type: string, payload?: IRequestParams }) {
    try {
      const response = yield call(fetchAnimals, action.payload);
      yield put(actionHomeFetchAnimalsSuccess(response))
    } catch (e) {
      yield put(actionHomeFetchAnimalsFailure(e))
    }
}

function* fetchHomePageDogsList(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchAnimals, action.payload);
    yield put(actionHomeFetchDogsSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchDogsFailure(e))
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

function* fetchHomePageCatsList(action: { type: string, payload?: IRequestParams }) {
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

function* fetchHomePageInfoCard(){
  try {
    const response = yield call(fetchInfoCard);
    yield put(actionFetchInfoCardSuccess(response))
  } catch (e) {
    yield put(actionFetchInfoCardlFailUrl(e))
  }
}

function* getBlogList(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchBlogList, action.payload);
    yield put(actionHomeFetchBlogListSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchBlogListFailure(e))
  }
}

export function* watchHomePage() {
  yield takeEvery(getType(actionHomeFetchAnimalsRequest), fetchHomePageAnimalsList);
  yield takeEvery(getType(actionHomeFetchDogsRequest), fetchHomePageDogsList);
  yield takeEvery(getType(actionHomeFetchCatsRequest), fetchHomePageCatsList);
  yield takeEvery(getType(actionHomeFetchSavedAnimalsCount), getSavedAnimalsCount)
  yield takeEvery(getType(actionHomeFetchSickAnimals), fetchHomePageSickAnimalsList);
  yield takeEvery(getType(actionFetchInfoCard), fetchHomePageInfoCard);
  yield takeEvery(getType(actionHomeFetchBlogListRequest), getBlogList);
}