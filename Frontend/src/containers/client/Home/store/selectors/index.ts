import {ICustomAppState} from "../../../../../store/state";
import {HOME_PAGE_KEY} from "../reducer";

export const selectAnimalsList = (state:ICustomAppState) => state[HOME_PAGE_KEY].animalsList;
