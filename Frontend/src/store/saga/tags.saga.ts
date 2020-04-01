import { takeEvery, call, put } from "redux-saga/effects";

import { actionGetTagsListSuccess, actionGetTagsListError, actionGetTagsList, actionDeleteTag, actionDeleteTagSuccess, actionDeleteTagError } from './../actions/tags.actions';
import { getType } from "typesafe-actions";
import { IRequestParams } from "../../api/requestOptions";
import { fetchTags, deleteTagRequest } from "../../api/tags";
import { actionShowSnackbar } from "../actions/snackbar.actions";

function* getTags(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchTags, action.payload);
    yield put(actionGetTagsListSuccess(response))
  } catch (e) {
    yield put(actionGetTagsListError(e))
  }
}
function* deleteTag(action: { type: string, payload: string }) {
  try {
    yield call(deleteTagRequest, action.payload);
    yield put(actionDeleteTagSuccess(action.payload));
    yield put(actionShowSnackbar('Tag deleted!'))
  } catch (e) {
    yield put(actionDeleteTagError(e))
  }
}

export function* watchTags() {
  yield takeEvery(getType(actionGetTagsList), getTags);
  yield takeEvery(getType(actionDeleteTag), deleteTag)
}