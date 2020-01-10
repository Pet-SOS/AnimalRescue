import axios from 'axios';

export const BASE_URL = `https://animalrescueapi.azurewebsites.net/api/`

export default axios.create({
    baseURL: BASE_URL
});

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';
