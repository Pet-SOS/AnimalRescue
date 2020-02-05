import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  actionFetchAnimalItemRequest,
  actionFetchAnimalItemSuccess,
  actionFetchAnimalItemFailure
} from '../actions/animal.actions';
import { fetchAnimalItem } from '../../../../../api/animals';

function* getAnimalItem(action: { type: string, payload: string }) {
  try {
    const response = yield call(fetchAnimalItem, action.payload);
    yield put(actionFetchAnimalItemSuccess(response))
  } catch (e) {
    yield put(actionFetchAnimalItemFailure(e))
  }
}

export function* watchAnimalItem() {
  yield takeEvery(getType(actionFetchAnimalItemRequest), getAnimalItem);
}