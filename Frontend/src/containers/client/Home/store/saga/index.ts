import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  actionFetchInfoCard,
  actionFetchInfoCardSuccess,
  actionFetchInfoCardlFailUrl,
  actionFetchInfoContacts,
  actionFetchInfoContactsSuccess,
  actionFetchInfoContactsFailUrl,
  actionFetchHelpPopupSuccess,
  actionFetchHelpPopupFailUrl,
  actionFetchHelpPopup,
} from '../actions';
import { fetchInfoCard } from '../../../../../api/infoCard';
import { fetchInfoContacts } from '../../../../../api/contacts';
import { fetchHelpPopup } from '../../../../../api/help-popup';

function* fetchHomePageInfoCard() {
  try {
    const response = yield call(fetchInfoCard);
    yield put(actionFetchInfoCardSuccess(response));
  } catch (e) {
    yield put(actionFetchInfoCardlFailUrl(e));
  }
}

function* fetchHomePageInfoContacts() {
  try {
    const response = yield call(fetchInfoContacts);
    yield put(actionFetchInfoContactsSuccess(response));
  } catch (e) {
    yield put(actionFetchInfoContactsFailUrl(e));
  }
}

function* fetchHomePageHelpPopup() {
  try {
    const response = yield call(fetchHelpPopup);
    yield put(actionFetchHelpPopupSuccess(response));
  } catch (e) {
    yield put(actionFetchHelpPopupFailUrl(e));
  }
}

export function* watchHomePage() {
  yield takeEvery(getType(actionFetchInfoCard), fetchHomePageInfoCard);
  yield takeEvery(getType(actionFetchInfoContacts), fetchHomePageInfoContacts);
  yield takeEvery(getType(actionFetchHelpPopup), fetchHomePageHelpPopup);
}
