import axios from 'axios';
import { requestRefreshToken } from './login';

export const BASE_URL = process.env.REACT_APP_API_URL;
export const BASE_YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/';

export const API_YOTUBE = axios.create();

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
API.interceptors.request.use(async config => {
  let token = localStorage.getItem('jwt-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject('Network Error');
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      const response = await requestRefreshToken();
      if (response.status !== 200) {
        localStorage.removeItem('jwt-token');
        window.location.reload();
      } else {
        return axios(originalRequest);
      }
    }
    return error.response;
  },
);
export default API;

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';
export * from './admin';
export * from './common';
