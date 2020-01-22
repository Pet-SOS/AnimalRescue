import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import { fetchBlogList } from "../../../../../api/blog";
import {
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl,
  actionHomeFetchBlogListSuccess,
  actionHomeFetchBlogListFailure,
  actionHomeFetchBlogListRequest,
  actionHomeFetchBlogListSavedRequest,
  actionHomeFetchBlogListSavedSuccess,
  actionHomeFetchBlogListSavedFailure,
  actionFetchInfoContacts,
  actionFetchInfoContactsSuccess,
  actionFetchInfoContactsFailUrl
} from "../actions";
import { fetchInfoCard } from "../../../../../api/infoCard";
import { IRequestParams } from '../../../../../api/requestOptions';
import { fetchInfoContacts } from '../../../../../api/contacts';

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

function* getBlogListSaved(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchBlogList, action.payload);
    yield put(actionHomeFetchBlogListSavedSuccess(response))
  } catch (e) {
    yield put(actionHomeFetchBlogListSavedFailure(e))
  }
}
function* fetchHomePageInfoContacts(){
  try {
    const response = yield call(fetchInfoContacts);
    yield put(actionFetchInfoContactsSuccess(response))
  } catch (e) {
    yield put(actionFetchInfoContactsFailUrl(e))
  }
}

export function* watchHomePage() {
  yield takeEvery(getType(actionFetchInfoCard), fetchHomePageInfoCard);
  yield takeEvery(getType(actionHomeFetchBlogListRequest), getBlogList);
  yield takeEvery(getType(actionHomeFetchBlogListSavedRequest), getBlogListSaved);
  yield takeEvery(getType(actionFetchInfoContacts), fetchHomePageInfoContacts);
}