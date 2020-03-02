import { createAction } from 'typesafe-actions';
import { YouTubeVideosResponse } from '../../api/youtube';

export const loadYouTubeVideos = createAction(
  'LOAD_YOUTUBE_VIDEOS',
  (resolve) => (count?: number) => resolve(count)
);
export const loadYouTubeVideosSuccess = createAction(
  'LOAD_YOUTUBE_VIDEOS_SUCCESS',
  (resolve) => (data: YouTubeVideosResponse) => resolve(data.items)
);
export const loadYouTubeVideosFailUrl = createAction(
  'LOAD_YOUTUBE_VIDEOS_FAIL_URL',
  (resolve) => (error: Error) => resolve({ error })
);
export const clearYouTubeVideos = createAction(
  'CLEAR_YOUTUBE_VIDEOS'
)