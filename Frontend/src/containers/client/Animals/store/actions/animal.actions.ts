import { createAction } from 'typesafe-actions';
import { IAnimalResponse } from '../../../../../api/animals';

export const actionFetchAnimalItemRequest = createAction(
  'FETCH_ANIMAL_ITEM_REQUEST',
  (resolve) => (id: string) => resolve(id)
);
export const actionFetchAnimalItemSuccess = createAction(
  'FETCH_ANIMAL_ITEM_SUCCESS',
  (resolve) => (data: IAnimalResponse) => resolve(data)
);
export const actionFetchAnimalItemFailure = createAction(
  'FETCH_ANIMAL_ITEM_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionClearAnimalItemState = createAction(
  'CLEAR_ANIMAL_ITEM_STATE'
);