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
  actionFetchTakeHomePopupRequest,
  actionFetchTakeHomePopupSuccess,
  actionFetchTakeHomePopupFailure,
  actionFetchHowToAdoptRequest,
  actionFetchHowToAdoptSuccess,
  actionFetchHowToAdoptFailure,
  actionFetchLanguagesRequest,
  actionFetchLanguagesSuccess,
  actionFetchLanguagesFailure,
} from '../actions';
import { fetchInfoCard } from '../../../../../api/infoCard';
import { fetchInfoContacts } from '../../../../../api/contacts';
import { fetchHelpPopup } from '../../../../../api/help-popup';
import { fetchTakeHomePopup } from '../../../../../api/takeHomePopup';
import { fetchHowToAdopt } from '../../../../../api/howToAdopt';
import { fetchLanguages } from '../../../../../api/languages';

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

function* getTakeHomePopup() {
  try {
    const response = yield call(fetchTakeHomePopup);
    yield put(actionFetchTakeHomePopupSuccess(response));
  } catch (e) {
    yield put(actionFetchTakeHomePopupFailure(e));
  }
}

function* getHowToAdopt() {
  try {
    const response = yield call(fetchHowToAdopt);
    yield put(actionFetchHowToAdoptSuccess(response));
  } catch (e) {
    yield put(actionFetchHowToAdoptFailure(e));
  }
}

function* getAvailableLanguages() {
  try {
    const response = yield call(fetchLanguages);
    yield put(actionFetchLanguagesSuccess(response));
  } catch (e) {
    yield put(actionFetchLanguagesFailure(e));
  }
}

export function* watchHomePage() {
  yield takeEvery(getType(actionFetchInfoCard), fetchHomePageInfoCard);
  yield takeEvery(getType(actionFetchInfoContacts), fetchHomePageInfoContacts);
  yield takeEvery(getType(actionFetchHelpPopup), fetchHomePageHelpPopup);
  yield takeEvery(getType(actionFetchTakeHomePopupRequest), getTakeHomePopup);
  yield takeEvery(getType(actionFetchHowToAdoptRequest), getHowToAdopt);
  yield takeEvery(getType(actionFetchLanguagesRequest), getAvailableLanguages);
}
