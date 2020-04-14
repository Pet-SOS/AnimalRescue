import { TAGS_KEY, ALL_TAGS_KEY } from './../reducers/tags.reducer';
import { ITagsState } from './../state/tags.state';
import { ICustomAppState } from "../state";
import { ITag } from '../../api/tags';

export const selectTagsListState = (state: ICustomAppState): ITagsState => state[TAGS_KEY];
export const selectTagsListData = (state: ICustomAppState): Array<ITag> => state[TAGS_KEY].data;
export const selectIsTagsListLoaded = (state: ICustomAppState): boolean => state[TAGS_KEY].isLoaded;
export const selectIsTagsListLoading = (state: ICustomAppState): boolean => state[TAGS_KEY].isLoading;

export const selectAllTagsState = (state: ICustomAppState): ITagsState => state[ALL_TAGS_KEY];
export const selectAllTagsData = (state: ICustomAppState): Array<ITag> => state[ALL_TAGS_KEY].data;
export const selectIsAllTagsLoaded = (state: ICustomAppState): boolean => state[ALL_TAGS_KEY].isLoaded;
export const selectIsAllTagsLoading = (state: ICustomAppState): boolean => state[ALL_TAGS_KEY].isLoading;