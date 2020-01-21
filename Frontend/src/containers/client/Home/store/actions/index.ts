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
);