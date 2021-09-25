import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';
import { IBlogListResponse } from '../../../../../api/blog';

export interface IBlogsState {
  blogList: IBlogListResponse;
  blogListRequestState: IRequestState;
  blogListSaved: IBlogListResponse;
  blogListSavedRequestState: IRequestState;
}

export const DEFAULT_BLOGS: IBlogListResponse = {
  data: [],
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  totalCount: 0,
};

export const DEFAULT_BLOGS_STATE: IBlogsState = {
  blogList: { ...DEFAULT_BLOGS },
  blogListRequestState: { ...DEFAULT_REQUEST_STATE },
  blogListSaved: { ...DEFAULT_BLOGS },
  blogListSavedRequestState: { ...DEFAULT_REQUEST_STATE },
};
