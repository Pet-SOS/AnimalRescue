import { createAction } from 'typesafe-actions';
import { IRequestParams } from '../../api/requestOptions';
import { IVacanciesResponse } from '../../api/vacancies';

export const actionFetchVacanciesRequest = createAction(
  'FETCH_VACANCIES_REQUEST',
  resolve => (requestParams?: IRequestParams) => resolve(requestParams),
);
export const actionFetchVacanciesSuccess = createAction(
  'FETCH_VACANCIES_SUCCESS',
  resolve => (data: IVacanciesResponse) => resolve(data),
);
export const actionFetchVacanciesFailure = createAction(
  'FETCH_VACANCIES_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);
export const actionClearVacanciesState = createAction('CLEAR_VACANCIES_STATE');
