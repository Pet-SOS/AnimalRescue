import {createAction} from 'typesafe-actions';
import {IAnimalsResponse} from "../../../../../api/animals";

export const actionAdminHomeFetchAnimalsRequest = createAction(
    'ADMIN_HOME_FETCH_ANIMALS_REQUEST',
    (resolve) => () => resolve({})
);
export const actionAdminHomeFetchAnimalsSuccess = createAction(
    'ADMIN_HOME_FETCH_ANIMALS_SUCCESS',
    (resolve) => (data: IAnimalsResponse) => resolve({data})
);
export const actionAdminHomeFetchAnimalsFailure = createAction(
    'ADMIN_HOME_FETCH_ANIMALS_FAILURE',
    (resolve) => (error: Error) => resolve({error})
);
