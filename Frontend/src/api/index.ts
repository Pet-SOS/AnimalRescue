import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL

export default axios.create({
    baseURL: BASE_URL
});

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';
