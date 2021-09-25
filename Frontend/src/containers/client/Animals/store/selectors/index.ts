import { ICustomAppState } from '../../../../../store/state';
import { ANIMALS_KEY } from '../reducer';
import { store } from '../../../../../store';
import { IAnimalsListState } from '../state';
import { actionFetchSickAnimals } from '../actions';
import { ISavedAnimalsCountResponse } from '../../../../../api/animals';

export const selectAnimalsList = (state: ICustomAppState): IAnimalsListState =>
  state[ANIMALS_KEY].animalsList;
export const selectSickAnimals = (state: ICustomAppState): IAnimalsListState =>
  state[ANIMALS_KEY].sickAnimalsList;
export const selectDogsList = (state: ICustomAppState): IAnimalsListState =>
  state[ANIMALS_KEY].dogsList;
export const selectCatsList = (state: ICustomAppState): IAnimalsListState =>
  state[ANIMALS_KEY].catsList;
export const selectSavedAnimalsCount = (
  state: ICustomAppState,
): ISavedAnimalsCountResponse => state[ANIMALS_KEY].savedAnimalsCount;
export const selectFavoriteAnimalsIds = (state: ICustomAppState): string[] =>
  state[ANIMALS_KEY].favoriteAnimalsIds;
export const selectFavoriteAnimalsList = (
  state: ICustomAppState,
): IAnimalsListState => state[ANIMALS_KEY].favoriteAnimalsList;

export const sickAnimalsCheckAndLoadDefault = (): void => {
  const state: IAnimalsListState = selectSickAnimals(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchSickAnimals());
  }
};
