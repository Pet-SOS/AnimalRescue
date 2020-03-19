import axios from 'axios';

//export const BASE_URL = process.env.REACT_APP_API_URL;
export const BASE_URL = 'https://localhost:5001/api/';
export const BASE_YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/';

export const API_YOTUBE = axios.create({
  baseURL: BASE_YOUTUBE_URL
})

const API = axios.create({
    baseURL: BASE_URL,
    headers:{
      'Content-Type':'application/json'
    }
});
API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('jwt-token');
  console.log('token', token);
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(async (response) => {
  return response;
}, (error) => {
  const originalRequest = error.config;
  if (!error.response) {
    return Promise.reject('Network Error');
  }
  if ((error.response.status === 401) && !originalRequest._retry) {
    localStorage.removeItem('jwt-token');
    return;
  }
  return error.response
});
 export default API;

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';
