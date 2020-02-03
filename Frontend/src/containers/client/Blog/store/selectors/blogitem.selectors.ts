import { IBlogItemState } from './../state/blogitem.state';
import { ICustomAppState } from "../../../../../store/state";
import { BLOG_ITEM_KEY } from "../reducer/blogitem.reducer";

export const selectBlogItem = (state: ICustomAppState): IBlogItemState => state[BLOG_ITEM_KEY];