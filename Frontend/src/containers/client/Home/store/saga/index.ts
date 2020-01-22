import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl,
  actionFetchInfoContacts,
  actionFetchInfoContactsSuccess,
  actionFetchInfoContactsFailUrl
} from "../actions";
import { fetchInfoCard } from "../../../../../api/infoCard";
import { fetchInfoContacts } from '../../../../../api/contacts';

function* fetchHomePageInfoCard(){
  try {
    const response = yield call(fetchInfoCard);
    yield put(actionFetchInfoCardSuccess(response))
  } catch (e) {
    yield put(actionFetchInfoCardlFailUrl(e))
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
  yield takeEvery(getType(actionFetchInfoContacts), fetchHomePageInfoContacts);
  yield takeEvery(getType(actionFetchInfoCard), fetchHomePageInfoCard);
}