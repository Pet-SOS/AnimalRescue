import { ICustomAppState } from "../../../../../store/state";
import { ANIMALS_KEY } from "../reducer";

export const selectAnimalsList = (state: ICustomAppState) => state[ANIMALS_KEY].animalsList;
export const selectSickAnimals = (state: ICustomAppState) => state[ANIMALS_KEY].sickAnimalsList;
export const selectDogsList = (state: ICustomAppState) => state[ANIMALS_KEY].dogsList;
export const selectCatsList = (state: ICustomAppState) => state[ANIMALS_KEY].catsList;
export const selectSavedAnimalsCount = (state: ICustomAppState) => state[ANIMALS_KEY].savedAnimalsCount;