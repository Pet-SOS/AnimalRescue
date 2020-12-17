import { API_YOTUBE } from './index';

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
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
}

export interface YouTubeVideosResponse {
  kind: string;
  etag: string;
  nextPageToke: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYouTubeVideo[];
}

export async function fetchYouTubeVideosList(
  count?: number,
): Promise<YouTubeVideosResponse> {
  const res = await API_YOTUBE.get('search', {
    params: {
      part: 'snippet',
      type: 'video',
      maxResults: !!count ? count : 10,
      order: 'date',
      id: '',
    },
  });
  return res.data;
}
