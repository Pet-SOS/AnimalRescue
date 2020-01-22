import {createAction} from 'typesafe-actions';
import { IRequestParams, RequestFilterOperators, AllTag } from '../../../../../api/requestOptions';
import { IBlogListResponse } from './../../../../../api/blog';
import { IInfoContacts } from '../../../../../api/contacts';

export const actionIsActivePopup = createAction(
    'HOME_FETCH_ANIMALS_IS_ACTIVE_POPUP',
    (resolve) => (data: boolean) => resolve({data})
);

export const actionFetchInfoCard = createAction(
    'HOME_FETCH_INFO_CARD',
    (resolve) => () => resolve({})
);
export const actionFetchInfoCardSuccess = createAction(
    'HOME_FETCH_INFO_CARD_SUCCESS',
    (resolve) => (data:any) => resolve({data})
);
export const actionFetchInfoCardlFailUrl = createAction(
    'HOME_FETCH_INFO_CARD_FAILURL',
    (resolve) => (error: Error) => resolve({error})
)
export const actionHomeFetchBlogListRequest = createAction(
  'HOME_FETCH_BlOG_LIST_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve(requestParams)
);
export const actionHomeFetchBlogListSuccess = createAction(
  'HOME_FETCH_BLOG_LIST_SUCCESS',
  (resolve) => (data: IBlogListResponse) => resolve(data)
);
export const actionHomeFetchBlogListFailure = createAction(
  'HOME_FETCH_BLOG_LIST_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);

export const actionHomeFetchBlogListSavedRequest = createAction(
  'HOME_FETCH_BlOG_LIST_SAVED_REQUEST',
  (resolve) => (requestParams?: IRequestParams) => resolve({
    ...requestParams,
    filter: {
      fieldName: 'tags',
      opeartor: RequestFilterOperators.ALL,
      value: AllTag.SAVED
    }
  })
);
export const actionHomeFetchBlogListSavedSuccess = createAction(
  'HOME_FETCH_BLOG_LIST_SAVED_SUCCESS',
  (resolve) => (data: IBlogListResponse) => resolve(data)
);
export const actionHomeFetchBlogListSavedFailure = createAction(
  'HOME_FETCH_BLOG_LIST_SAVED_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);
export const actionFetchInfoContacts = createAction(
    'HOME_FETCH_INFO_CONTACTS',
    (resolve) => () => resolve({})
);
export const actionFetchInfoContactsSuccess = createAction(
    'HOME_FETCH_INFO_CONTACTS_SUCCESS',
    (resolve) => (data: IInfoContacts) => resolve(data)
);
export const actionFetchInfoContactsFailUrl = createAction(
    'HOME_FETCH_INFO_CONTACTS_FAILURL',
    (resolve) => (error: Error) => resolve({error})
)
