import { call, put, takeEvery } from 'redux-saga/effects';
import { actionShowSnackbar } from '../../../../../store/actions/snackbar.actions';
import {
  actionUpdateBlogItemFailure,
  actionUpdateBlogItemRequest,
  actionUpdateBlogItemSuccess,
  actionDeleteBlogItem,
  actionDeleteBlogItemFailure,
  actionDeleteBlogItemSuccess,
} from '../actions';
import { updateBlogItem, deleteBlogItem } from '../../../../../api/blog';
import { getType } from 'typesafe-actions';
import { actionFetchBlogItemRequest } from '../../../../client/Blog/store/actions/blogitem.actions';

export function* editBlogSaga(
  action: ReturnType<typeof actionUpdateBlogItemRequest>,
) {
  const blog = action.payload;
  try {
    yield call(updateBlogItem, blog);
    yield put(actionUpdateBlogItemSuccess(blog));
    yield put(actionShowSnackbar('Blog updated successfully'));
  } catch (e) {
    yield put(actionUpdateBlogItemFailure(e));
    yield put(actionShowSnackbar('Error occurred during blog update'));
  }
}

export function* deleteBlogItemSaga(action: any) {
  const { id } = action.payload;
  try {
    yield deleteBlogItem(id);
    yield put(actionDeleteBlogItemSuccess(id));
    window.location.reload();
  } catch (e) {
    yield put(actionDeleteBlogItemFailure(e));
  }
}

export function* watchBlogEditSagas() {
  yield takeEvery(getType(actionUpdateBlogItemRequest), editBlogSaga);
  yield takeEvery(getType(actionDeleteBlogItem), deleteBlogItemSaga);
}
