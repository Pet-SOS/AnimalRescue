import { ICustomAppState } from "../../../../../store/state";
import { ANIMALS_KEY } from "../reducer";
import { store } from "../../../../../store";
import { IAnimalsListState } from "../state";
import { actionFetchSickAnimals } from "../actions";

export const selectAnimalsList = (state: ICustomAppState) => state[ANIMALS_KEY].animalsList;
export const selectSickAnimals = (state: ICustomAppState) => state[ANIMALS_KEY].sickAnimalsList;
export const selectDogsList = (state: ICustomAppState) => state[ANIMALS_KEY].dogsList;
export const selectCatsList = (state: ICustomAppState) => state[ANIMALS_KEY].catsList;
export const selectSavedAnimalsCount = (state: ICustomAppState) => state[ANIMALS_KEY].savedAnimalsCount;

export const sickAnimalsCheckAndLoadDefault = (): void => {
  const state: IAnimalsListState = selectSickAnimals(store.getState());
  if (!state.isLoaded && !state.isLoading) {
    store.dispatch(actionFetchSickAnimals())
  }
}