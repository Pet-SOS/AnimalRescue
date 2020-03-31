import { IRequestState, DEFAULT_REQUEST_STATE } from '../../api';
import { ITagsResponse } from '../../api/tags';

export interface ITagsState extends ITagsResponse {
  isLoading: boolean;
  isLoaded: boolean;
  requestState: IRequestState;
}

export const DEFAULT_TAGS_STATE: ITagsState = {
  data: [],
  totalCount: 0,
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  isLoaded: false,
  isLoading: false,
  requestState: { ...DEFAULT_REQUEST_STATE }
}