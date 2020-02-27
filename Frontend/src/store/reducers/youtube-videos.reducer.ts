import { AnyAction } from "redux";
import { getType } from "typesafe-actions";

import { loadYouTubeVideos, loadYouTubeVideosSuccess, loadYouTubeVideosFailUrl, clearYouTubeVideos } from '../actions/youtube-videos.actions';
import { IYouTubeVideosState } from "../state/youtube-videos.state";
import { DEFAULT_YOUTUBE_VIDEO_STATE } from '../state/youtube-videos.state';

export const videosReducer = (state: IYouTubeVideosState = DEFAULT_YOUTUBE_VIDEO_STATE, action: AnyAction): IYouTubeVideosState => {
  switch (action.type) {
    case getType(loadYouTubeVideos):
      return {
        ...state,
        isLoading: true
      }
    case getType(loadYouTubeVideosSuccess):
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: [ ...action.payload ]
      }
    case getType(loadYouTubeVideosFailUrl):
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      }
    case getType(clearYouTubeVideos):
      return {
        ...DEFAULT_YOUTUBE_VIDEO_STATE
      }
    default:
      return state;
  };
}

export const YOUTUBE_VIDEOS_KEY = 'youtube-videos';
