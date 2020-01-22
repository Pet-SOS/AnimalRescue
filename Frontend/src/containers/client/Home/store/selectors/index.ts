import {ICustomAppState} from "../../../../../store/state";
import {HOME_PAGE_KEY} from "../reducer";

export const selectSavedInfoCard = (state: ICustomAppState) => state[HOME_PAGE_KEY].infoCard;
export const selectBlogList = (state: ICustomAppState) => state[HOME_PAGE_KEY].blogList;
export const selectBlogListSaved = (state: ICustomAppState) => state[HOME_PAGE_KEY].blogListSaved;
