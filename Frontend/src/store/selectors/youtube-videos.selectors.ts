import { YOUTUBE_VIDEOS_KEY } from './../reducers/youtube-videos.reducer';
import { ICustomAppState } from '../state/index';
import { IYouTubeVideo } from '../../api/youtube';

export const selectVideosList = (state: ICustomAppState): IYouTubeVideo[] => state[YOUTUBE_VIDEOS_KEY].data;