import { getType } from 'typesafe-actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import {
  actionFetchOrganizationDocumentsSuccess,
  actionFetchOrganizationDocumentsFailure,
  actionFetchOrganizationDocumentsRequest,
} from '../actions/organizationDocuments.actions';
import { fetchOrganizationDocuments } from '../../api/organizationDocuments';

function* getOrganizationDocuments() {
  try {
    const response = yield call(fetchOrganizationDocuments);
    yield put(actionFetchOrganizationDocumentsSuccess(response));
  } catch (e) {
    yield put(actionFetchOrganizationDocumentsFailure(e));
  }
}

export function* watchOrganizationDocuments() {
  yield takeEvery(
    getType(actionFetchOrganizationDocumentsRequest),
    getOrganizationDocuments,
  );
}
