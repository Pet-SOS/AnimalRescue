import axios, { AxiosInstance } from 'axios';
import { API, API_YOTUBE } from './../index';
import { store } from '../../store';
import { selectConfigData, selectApiUrl } from '../../store/selectors/config.selector';
import { IAPIConfig } from '../config';

export const defaultInterceptor = (api: AxiosInstance): void => {
  api.interceptors.request.use(
    config => {
      config.baseURL = selectApiUrl(store.getState());
      return config
    },
    error => Promise.reject(error)
  );
}

export const youtubeInterceptor = (): void => {
  API_YOTUBE.interceptors.request.use(
    config => {
      const { YOUTUBE_URL, YOUTUBE_CHANEL_ID, YOUTUBE_API_KEY }: IAPIConfig = selectConfigData(store.getState());
      config.baseURL = YOUTUBE_URL;
      config.params.channelId = YOUTUBE_CHANEL_ID;
      config.params.key = YOUTUBE_API_KEY;
      return config;
    },
    error => Promise.reject(error)
  )
}

export const createInterceptors = () => {
  defaultInterceptor(API);
  defaultInterceptor(axios);
  youtubeInterceptor();
}