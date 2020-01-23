import { ICustomAppState } from "../../../../../store/state";
import { BLOGS_KEY } from "../reducer";

export const selectBlogList = (state: ICustomAppState) => state[BLOGS_KEY].blogList;
export const selectBlogListSaved = (state: ICustomAppState) => state[BLOGS_KEY].blogListSaved;