import { TAGS_KEY } from '../reducers/tags.reducer';
import { ITagsState } from '../state/tags.state';
import { ICustomAppState } from '../state';
import { ITag } from '../../api/tags';

export const selectTagsListState = (state: ICustomAppState): ITagsState =>
  state[TAGS_KEY];
export const selectTagsListData = (state: ICustomAppState): Array<ITag> =>
  state[TAGS_KEY].data;
export const selectIsTagsListLoaded = (state: ICustomAppState): boolean =>
  state[TAGS_KEY].isLoaded;
export const selectIsTagsListLoading = (state: ICustomAppState): boolean =>
  state[TAGS_KEY].isLoading;
export const selectCategory = (state: ICustomAppState): string =>
  selectTagsListState(state).selectedCategory;

const IGNORED_CATEGORY = 'breed';
const isIgnoredCategory = (tag: ITag) => {
  return tag.category.toLowerCase().endsWith(IGNORED_CATEGORY);
};

export const selectTagsCategoryListData = (
  state: ICustomAppState,
): { [key: string]: Array<ITag> } => {
  let tags = selectTagsListData(state);
  let result: { [key: string]: Array<ITag> } = {};
  tags.reduce((obj, acc) => {
    if (!isIgnoredCategory(acc)) {
      let category = acc.category;
      if (!!obj[category]) {
        obj[category].push(acc);
      } else {
        obj[category] = [acc];
      }
    }
    return obj;
  }, result);
  return result;
};
