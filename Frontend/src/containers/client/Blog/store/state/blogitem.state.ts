import { IBlogItemResponse } from './../../../../../api/blog';
import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';

export interface IBlogItemState extends IBlogItemResponse {
  isLoading: boolean;
  isLoaded: boolean;
  requestState: IRequestState;
}

export const DEFAULT_BLOG_ITEM_STATE: IBlogItemState = {
  data: {
    type: '',
    title: '',
    body: '',
    imageIds: [],
    tags: [],
    createdAt: '',
    id: '',
  },
  self: '',
  isLoaded: false,
  isLoading: false,
  requestState: { ...DEFAULT_REQUEST_STATE },
};
