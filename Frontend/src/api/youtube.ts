import { API_YOTUBE } from './index';
import { getEnv } from '../env/env';

const env = getEnv();

export interface IYouTubeVideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface IYouTubeVideo {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: IYouTubeVideoThumbnail;
      medium: IYouTubeVideoThumbnail;
      high: IYouTubeVideoThumbnail;
    }
    channelTitle: string;
    liveBroadcastContent: string;
  }
}

export interface YouTubeVideosResponse {
  kind: string;
  etag: string;
  nextPageToke: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number
  };
  items: IYouTubeVideo[]
}

export async function fetchYouTubeVideosList(count?: number): Promise<YouTubeVideosResponse> {
  const res = await API_YOTUBE.get('search', {params: {
    part: 'snippet',
    channelId: env.REACT_APP_CHANEL_ID,
    key: env.REACT_APP_YOUTUBE_API_KEY,
    type: 'video',
    maxResults: !!count ? count : 10,
    order: 'date',
    id: ''
  }});
  return res.data
}