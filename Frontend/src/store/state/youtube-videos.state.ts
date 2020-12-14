import { IYouTubeVideo } from '../../api/youtube';

export interface IYouTubeVideosState {
  isLoading: boolean;
  isLoaded: boolean;
  data: IYouTubeVideo[];
}

export const DEFAULT_YOUTUBE_VIDEO_STATE: IYouTubeVideosState = {
  isLoaded: false,
  isLoading: false,
  data: [],
};
