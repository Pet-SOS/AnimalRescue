import { IRequestState, DEFAULT_REQUEST_STATE } from '../../api';
import { IOrganizationDocumentsResponse } from '../../api/organizationDocuments';

export interface IOrganizationDocumentsState extends IOrganizationDocumentsResponse {
  isLoading: boolean;
  isLoaded: boolean;
  requestState: IRequestState;
}

export const DEFAULT_ORGANIZATIONDOCUMENTS_STATE: IOrganizationDocumentsState = {
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