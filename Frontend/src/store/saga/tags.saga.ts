import { takeEvery, call, put } from "redux-saga/effects";

import { actionGetTagsListSuccess, actionGetTagsListError, actionGetTagsList } from './../actions/tags.actions';
import { getType } from "typesafe-actions";
import { IRequestParams } from "../../api/requestOptions";
import { fetchTags } from "../../api/tags";

function* getTags(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchTags, action.payload);
    yield put(actionGetTagsListSuccess(response))
  } catch (e) {
    yield put(actionGetTagsListError(e))
  }
}

export function* watchTags() {
  yield takeEvery(getType(actionGetTagsList), getTags);
}