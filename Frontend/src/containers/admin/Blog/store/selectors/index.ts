import { ICustomAppState } from '../../../../../store/state';
import { BLOG_ITEM_KEY } from '../../../../client/Blog/store/reducer/blogitem.reducer';
import { IBlogItem } from '../../../../../api/blog';

export const selectBlogItem = (state: ICustomAppState): IBlogItem =>
  state[BLOG_ITEM_KEY].data;

export const isLoadedBlogItem = (state: ICustomAppState): boolean =>
  state[BLOG_ITEM_KEY].isLoaded;

export const isLoadingBlogItem = (state: ICustomAppState): boolean =>
  state[BLOG_ITEM_KEY].isLoading;
