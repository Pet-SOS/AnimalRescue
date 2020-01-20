import {createAction} from 'typesafe-actions';
import {IAnimalsResponse, ISavedAnimalsCountResponse} from "../../../../../api/animals";

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

export const actionIsActivePopup = createAction(
    'HOME_FETCH_ANIMALS_IS_ACTIVE_POPUP',
    (resolve) => (data: boolean) => resolve({data})
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