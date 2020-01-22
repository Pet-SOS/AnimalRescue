import {ICustomAppState} from "../../../../../store/state";
import {HOME_PAGE_KEY} from "../reducer";

export const selectAnimalsList = (state:ICustomAppState) => state[HOME_PAGE_KEY].animalsList;
export const selectSickAnimals = (state: ICustomAppState) => state[HOME_PAGE_KEY].sickAnimalsList;
export const selectDogsList = (state: ICustomAppState) => state[HOME_PAGE_KEY].dogsList;
export const selectCatsList = (state: ICustomAppState) => state[HOME_PAGE_KEY].catsList;
export const selectSavedAnimalsCount = (state: ICustomAppState) => state[HOME_PAGE_KEY].savedAnimalsCount;
export const selectSavedInfoCard = (state: ICustomAppState) => state[HOME_PAGE_KEY].infoCard;
export const selectBlogList = (state: ICustomAppState) => state[HOME_PAGE_KEY].blogList;
