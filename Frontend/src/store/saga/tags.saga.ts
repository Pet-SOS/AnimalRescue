import { takeEvery, call, put } from "redux-saga/effects";

import {
  actionGetTagsListSuccess,
  actionGetTagsListError,
  actionGetTagsList,
  actionDeleteTag,
  actionDeleteTagSuccess,
  actionDeleteTagError,
  actionAddTag,
  actionAddTagSuccess,
  actionAddTagError,
  actionGetAllTags,
  actionGetAllTagsSuccess,
  actionGetAllTagsError,
  actionUpdateTagSuccess,
  actionUpdateTagError,
  actionUpdateTag
} from './../actions/tags.actions';
import { getType } from "typesafe-actions";
import { IRequestParams } from "../../api/requestOptions";
import { fetchTags, deleteTagRequest, ITag, addTagRequest, updateTagRequest } from "../../api/tags";
import { actionShowSnackbar } from "../actions/snackbar.actions";

function* getTags(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchTags, action.payload);
    yield put(actionGetTagsListSuccess(response))
  } catch (e) {
    yield put(actionGetTagsListError(e))
  }
}
function* getAllTags(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchTags, action.payload);
    yield put(actionGetAllTagsSuccess(response))
    if(response.pageNumber < response.pageCount){
      yield put(actionGetAllTags({
        ...action.payload,
        page: response.pageNumber + 1
      }))
    }
  } catch (e) {
    yield put(actionGetAllTagsError(e))
  }
}
function* addTag(action: { type: string, payload: ITag }) {
  try {
    const response: { data: ITag; self: string } = yield call(addTagRequest, action.payload);
    yield put(actionAddTagSuccess(response.data));
    yield put(actionShowSnackbar('Tag added!'))
  } catch (e) {
    yield put(actionAddTagError(e));
    yield put(actionShowSnackbar('Error while adding tag'));
  }
}
function* updateTag(action: { type: string, payload: ITag }) {
  try {
    yield call(updateTagRequest, action.payload);
    yield put(actionUpdateTagSuccess(action.payload));
    yield put(actionShowSnackbar('Tag updated!'));
  } catch (e) {
    yield put(actionUpdateTagError(e));
    yield put(actionShowSnackbar('Error while updating tag'));
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
  yield takeEvery(getType(actionGetAllTags), getAllTags);
  yield takeEvery(getType(actionDeleteTag), deleteTag);
  yield takeEvery(getType(actionAddTag), addTag);
  yield takeEvery(getType(actionUpdateTag), updateTag);
}
