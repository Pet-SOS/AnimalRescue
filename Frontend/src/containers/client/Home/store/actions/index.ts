import {createAction} from 'typesafe-actions';
import {IAnimalsResponse, ISavedAnimalsCountResponse, AnimalKind} from "../../../../../api/animals";
import { IRequestParams, RequestFilterOperators } from '../../../../../api/requestOptions';
import { IBlogListResponse } from './../../../../../api/blog';

export const actionHomeFetchAnimalsRequest = createAction(
    'HOME_FETCH_ANIMALS_REQUEST',
    (resolve) => (requestParams?: IRequestParams) => resolve(requestParams)
);
export const actionHomeFetchAnimalsSuccess = createAction(
    'HOME_FETCH_ANIMALS_SUCCESS',
    (resolve) => (data: IAnimalsResponse) => resolve({data})
);
export const actionHomeFetchAnimalsFailure = createAction(
    'HOME_FETCH_ANIMALS_FAILURE',
    (resolve) => (error: Error) => resolve({ error })
);
export const actionHomeFetchDogsRequest = createAction(
  'HOME_FETCH_DOGS_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve({
    ...requestParams,
    filter: {
      fieldName: 'kindOfAnimal',
      opeartor: RequestFilterOperators.ALL,
      value: AnimalKind.DOG
    }
  })
);
export const actionHomeFetchDogsSuccess = createAction(
  'HOME_FETCH_DOGS_SUCCESS',
  (resolve) => (data: IAnimalsResponse) => resolve(data)
);
export const actionHomeFetchDogsFailure = createAction(
  'HOME_FETCH_DOGS_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionHomeFetchCatsRequest = createAction(
  'HOME_FETCH_CATS_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve({
    ...requestParams,
    filter: {
      fieldName: 'kindOfAnimal',
      opeartor: RequestFilterOperators.ALL,
      value: AnimalKind.CAT
    }
  })
);
export const actionHomeFetchCatsSuccess = createAction(
  'HOME_FETCH_CATS_SUCCESS',
  (resolve) => (data: IAnimalsResponse) => resolve(data)
);
export const actionHomeFetchCatsFailure = createAction(
  'HOME_FETCH_CATS_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);

export const actionIsActivePopup = createAction(
    'HOME_FETCH_ANIMALS_IS_ACTIVE_POPUP',
    (resolve) => (data: boolean) => resolve({data})
);
export const actionHomeFetchSickAnimals = createAction(
    'HOME_FETCH_SICK_ANIMALS',
    (resolve) => () => resolve({})
);
export const actionHomeFetchSickAnimalsSuccess = createAction(
    'HOME_FETCH_SICK_ANIMALS_SUCCESS',
    (resolve) => (data:any) => resolve({data})
);
export const actionHomeFetchSickAnimalFailUrl = createAction(
    'HOME_FETCH_ANIMALS_FAILURL',
    (resolve) => (error: Error) => resolve({error})
)

export const actionHomeFetchSavedAnimalsCount = createAction(
  'HOME_FETCH_SAVED_ANIMALS_COUNT',
  (resolve) => () => resolve()
)
export const actionHomeFetchSavedAnimalsCountSuccess = createAction(
  'HOME_FETCH_SAVED_ANIMALS_COUNT_SUCCESS',
  (resolve) => (data: ISavedAnimalsCountResponse) => resolve( data )
);
export const actionHomeFetchSavedAnimalsCountFailure = createAction(
  'HOME_FETCH_SAVED_ANIMALS_COUNT_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);

export const actionHomeFetchBlogListRequest = createAction(
  'HOME_FETCH_BlOG_LIST_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve(requestParams)
);
export const actionHomeFetchBlogListSuccess = createAction(
  'HOME_FETCH_BLOG_LIST_SUCCESS',
  (resolve) => (data: IBlogListResponse) => resolve(data)
);
export const actionHomeFetchBlogListFailure = createAction(
  'HOME_FETCH_BLOG_LIST_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);