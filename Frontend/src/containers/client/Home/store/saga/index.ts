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
  actionFetchHomePopupSuccess,
  actionFetchHomePopupFailUrl,
  actionFetchHomePopup,
} from '../actions';
import { fetchInfoCard } from '../../../../../api/infoCard';
import { fetchInfoContacts } from '../../../../../api/contacts';
import { fetchHelpPopup } from '../../../../../api/help-popup';
import { fetchHomePopup } from '../../../../../api/home-popup';

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

function* fetchHomePageHomePopup() {
  try {
    const response = yield call(fetchHomePopup);
    yield put(actionFetchHomePopupSuccess(response));
  } catch (e) {
    yield put(actionFetchHomePopupFailUrl(e));
  }
}

export function* watchHomePage() {
  yield takeEvery(getType(actionFetchInfoCard), fetchHomePageInfoCard);
  yield takeEvery(getType(actionFetchInfoContacts), fetchHomePageInfoContacts);
  yield takeEvery(getType(actionFetchHelpPopup), fetchHomePageHelpPopup);
  yield takeEvery(getType(actionFetchHomePopup), fetchHomePageHomePopup);
}
