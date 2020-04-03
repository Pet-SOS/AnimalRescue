import { createAction } from 'typesafe-actions';
import { IAnimalsResponse, ISavedAnimalsCountResponse, AnimalKind } from "../../../../../api/animals";
import { IRequestParams, RequestFilterOperators } from '../../../../../api/requestOptions';

export const actionFetchAnimalsRequest = createAction(
  'FETCH_ANIMALS_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve(requestParams)
);
export const actionFetchAnimalsSuccess = createAction(
  'FETCH_ANIMALS_SUCCESS',
  (resolve) => (data: IAnimalsResponse) => resolve({ data })
);
export const actionFetchAnimalsFailure = createAction(
  'FETCH_ANIMALS_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionFetchDogsRequest = createAction(
  'FETCH_DOGS_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve({
    ...requestParams,
    filter: {
      fieldName: 'kindOfAnimal',
      opeartor: RequestFilterOperators.ALL,
      value: AnimalKind.DOG
    }
  })
);
export const actionClearAnimalsList = createAction(
  'CLEAR_ANIMALS'
);
export const actionFetchDogsSuccess = createAction(
  'FETCH_DOGS_SUCCESS',
  (resolve) => (data: IAnimalsResponse) => resolve(data)
);
export const actionFetchDogsFailure = createAction(
  'FETCH_DOGS_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionClearDogs = createAction(
  'CLEAR_DOGS'
);
export const actionFetchCatsRequest = createAction(
  'FETCH_CATS_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve({
    ...requestParams,
    filter: {
      fieldName: 'kindOfAnimal',
      opeartor: RequestFilterOperators.ALL,
      value: AnimalKind.CAT
    }
  })
);
export const actionFetchCatsSuccess = createAction(
  'FETCH_CATS_SUCCESS',
  (resolve) => (data: IAnimalsResponse) => resolve(data)
);
export const actionFetchCatsFailure = createAction(
  'FETCH_CATS_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionClearCats = createAction(
  'CLEAR_CATS'
);
export const actionFetchSickAnimals = createAction(
  'FETCH_SICK_ANIMALS',
  (resolve) => () => resolve({})
);
export const actionFetchSickAnimalsSuccess = createAction(
  'FETCH_SICK_ANIMALS_SUCCESS',
  (resolve) => (data: any) => resolve({ data })
);
export const actionFetchSickAnimalFailUrl = createAction(
  'FETCH_ANIMALS_FAILURL',
  (resolve) => (error: Error) => resolve({ error })
)
export const actionClearSickAnimals = createAction(
  'CLEAR_SICK_ANIMALS'
);
export const actionFetchSavedAnimalsCount = createAction(
  'FETCH_SAVED_ANIMALS_COUNT',
  (resolve) => () => resolve()
)
export const actionFetchSavedAnimalsCountSuccess = createAction(
  'FETCH_SAVED_ANIMALS_COUNT_SUCCESS',
  (resolve) => (data: ISavedAnimalsCountResponse) => resolve(data)
);
export const actionFetchSavedAnimalsCountFailure = createAction(
  'FETCH_SAVED_ANIMALS_COUNT_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionClearSavedAnimalsCount = createAction(
  'CLEAR_SAVED_ANIMALS_COUNT'
);
export const actionClearEntireAnimalsState = createAction(
  'CLEAR_ALL_ANIMALS_STATE'
)
export const onAnimalFavoriteButtonClicked = createAction(
  'ANIMAL_FAVORIVE_BUTTON_CLICKED',
  (resolve) => (id: string) => resolve(id)
);
export const actionFetchFavoriteAnimalsRequest = createAction(
  'FETCH_FAVORITES_REQUEST',
  (resolve) => (animalIds: string[]) => resolve(animalIds)
);
export const actionFetchFavoriteAnimalsSuccess = createAction(
  'FETCH_FAVORITES_SUCCESS',
  (resolve) => (data: IAnimalsResponse) => resolve({ data })
);
export const actionFetchFavoriteAnimalsFailure = createAction(
  'FETCH_FAVORITES_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionClearFavoriteAnimals = createAction(
  'CLEAR_FAVORITE_ANIMALS_LIST'
);