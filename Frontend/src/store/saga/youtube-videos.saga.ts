import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import {
  loadYouTubeVideos,
  loadYouTubeVideosSuccess,
  loadYouTubeVideosFailUrl,
} from '../actions/youtube-videos.actions';
import { fetchYouTubeVideosList } from '../../api/youtube';

function* fetchVideos(action: { type: string; payload?: number }) {
  try {
    const response = yield call(fetchYouTubeVideosList, action.payload);
    yield put(loadYouTubeVideosSuccess(response));
  } catch (e) {
    yield put(loadYouTubeVideosFailUrl(e));
  }
}

export function* watchYouTubeVideosActions() {
  yield takeEvery(getType(loadYouTubeVideos), fetchVideos);
}
