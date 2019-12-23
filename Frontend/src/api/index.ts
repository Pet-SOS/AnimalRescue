import axios from 'axios';

export default axios.create({
    baseURL: `https://animalrescueapi.azurewebsites.net/api/`
});

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';