import {createAction} from 'typesafe-actions';
import {IAnimalsResponse} from "../../../../../api/animals";

export const actionHomeFetchAnimalsRequest = createAction(
    'HOME_FETCH_ANIMALS_REQUEST',
    (resolve) => () => resolve({})
);
export const actionHomeFetchAnimalsSuccess = createAction(
    'HOME_FETCH_ANIMALS_SUCCESS',
    (resolve) => (data: IAnimalsResponse) => resolve({data})
);
export const actionHomeFetchAnimalsFailure = createAction(
    'HOME_FETCH_ANIMALS_FAILURE',
    (resolve) => (error: Error) => resolve({error})
);

export const actionSetSlideIndexSuccess = createAction(
    'HOME_FETCH_ANIMALS_SET_SLIDE_SUCCESS',
    (resolve) => (data: number) => resolve({data})
)