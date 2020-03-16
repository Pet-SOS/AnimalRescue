import axios, { AxiosInstance } from 'axios';
import { API, API_YOTUBE } from './../index';
import { store } from '../../store';

const defaultInterceptor = (api: AxiosInstance): void => {
  api.interceptors.request.use(
    config => {
      config.baseURL = store.getState().config.data.API_URL;
      return config
    },
    error => Promise.reject(error)
  );
}

export const yotubeInterceptor = (): void => {
  API_YOTUBE.interceptors.request.use(
    config => {
      config.baseURL = store.getState().config.data.YOUTUBE_URL;
      config.params.channelId = store.getState().config.data.YOUTUBE_CHANEL_ID;
      config.params.key = store.getState().config.data.YOUTUBE_API_KEY;
      return config;
    },
    error => Promise.reject(error)
  )
}

export const createInterceptors = () => {
  defaultInterceptor(API);
  defaultInterceptor(axios);
  yotubeInterceptor();
}