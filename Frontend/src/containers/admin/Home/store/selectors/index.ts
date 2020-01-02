import {ICustomAppState} from "../../../../../store/state";
import {ADMIN_HOME_PAGE_KEY} from "../reducer";

export const selectAnimalsList = (state: ICustomAppState) => state[ADMIN_HOME_PAGE_KEY].animalsList;
