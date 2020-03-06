import axios from 'axios';
import { getEnv } from '../env/env';

const env = getEnv();

export const BASE_URL = env.REACT_APP_API_URL;
export const BASE_YOUTUBE_URL = env.REACT_APP_YOUTUBE_API_URL;

export const API_YOTUBE = axios.create({
  baseURL: BASE_YOUTUBE_URL
})

export default axios.create({
  baseURL: BASE_URL
});

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';
