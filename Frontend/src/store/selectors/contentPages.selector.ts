import { IContentPageState } from '../state/contentPages.state';
import { ICustomAppState } from '../state';
import { CONTENT_PAGE_KEY } from '../reducers/contentPages.reducer';

export const selectContentPage = (state: ICustomAppState): IContentPageState =>
  state[CONTENT_PAGE_KEY];