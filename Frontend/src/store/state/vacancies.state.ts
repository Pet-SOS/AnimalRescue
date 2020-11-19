import { IVacanciesResponse } from '../../api/vacancies';
import { IRequestState, DEFAULT_REQUEST_STATE } from '../../api';

export interface IVacanciesState extends IVacanciesResponse {
  isLoading: boolean;
  isLoaded: boolean;
  requestState: IRequestState;
}

export const DEFAULT_VACANCIES_STATE: IVacanciesState = {
  data: [],
  totalCount: 0,
  pageCount: 0,
  pageNumber: 0,
  pageSize: 0,
  self: '',
  isLoaded: false,
  isLoading: false,
  requestState: { ...DEFAULT_REQUEST_STATE },
};
