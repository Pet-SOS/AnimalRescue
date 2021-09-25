import { createAction } from 'typesafe-actions';
import { IAnimal, IAnimalsResponse } from '../../../../../api/animals';
import { IRequestParams } from '../../../../../api/requestOptions';

export const actionAdminHomeFetchAnimalsRequest = createAction(
  'ADMIN_HOME_FETCH_ANIMALS_REQUEST',
  resolve => (requestParams?: IRequestParams) => resolve(requestParams),
);
export const actionAdminHomeFetchAnimalsSuccess = createAction(
  'ADMIN_HOME_FETCH_ANIMALS_SUCCESS',
  resolve => (data: IAnimalsResponse) => resolve({ data }),
);
export const actionAdminHomeFetchAnimalsFailure = createAction(
  'ADMIN_HOME_FETCH_ANIMALS_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

export const actionAdminDeleteAnimalRequest = createAction(
  'ADMIN_DELETE_ANIMAL_REQUEST',
  resolve => resolve,
);
export const actionAdminDeleteAnimalSuccess = createAction(
  'ADMIN_DELETE_ANIMAL_SUCCESS',
);
export const actionAdminDeleteAnimalFailure = createAction(
  'ADMIN_DELETE_ANIMAL_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

export const actionAdminPostAnimalRequest = createAction(
  'ADMIN_POST_ANIMAL_REQUEST',
  resolve => resolve,
);
export const actionAdminPostAnimalSuccess = createAction(
  'ADMIN_POST_ANIMAL_SUCCESS',
);
export const actionAdminPostAnimalFailure = createAction(
  'ADMIN_POST_ANIMAL_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);

export const actionAdminUpdateAnimalRequest = createAction(
  'ADMIN_UPDATE_ANIMAL_REQUEST',
  resolve => (params: { animal: IAnimal; id?: string }) => resolve(params),
);
export const actionAdminUpdateAnimalSuccess = createAction(
  'ADMIN_UPDATE_ANIMAL_SUCCESS',
);
export const actionAdminUpdateAnimalFailure = createAction(
  'ADMIN_UPDATE_ANIMAL_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);
