import axios from 'axios';

export const API_YOTUBE = axios.create();
export const API = axios.create();

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';
