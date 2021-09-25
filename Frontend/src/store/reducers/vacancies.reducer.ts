import { actionClearVacanciesState } from './../actions/vacancies.actions';
import {
  IVacanciesState,
  DEFAULT_VACANCIES_STATE,
} from '../state/vacancies.state';
import { genericRequestReducer } from '../../api';
import {
  actionFetchVacanciesRequest,
  actionFetchVacanciesSuccess,
  actionFetchVacanciesFailure,
} from '../actions/vacancies.actions';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';

const fetchVacanciesStateReducer = genericRequestReducer(
  actionFetchVacanciesRequest,
  actionFetchVacanciesSuccess,
  actionFetchVacanciesFailure,
);

export const vacanciesReducer = (
  state: IVacanciesState = DEFAULT_VACANCIES_STATE,
  action: AnyAction,
): IVacanciesState => {
  switch (action.type) {
    case getType(actionFetchVacanciesRequest): {
      return {
        ...state,
        isLoading: true,
        requestState: fetchVacanciesStateReducer(state.requestState, action),
      };
    }
    case getType(actionFetchVacanciesSuccess):
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isLoaded: true,
        requestState: fetchVacanciesStateReducer(state.requestState, action),
      };
    case getType(actionFetchVacanciesFailure):
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        requestState: fetchVacanciesStateReducer(state.requestState, action),
      };
    case getType(actionClearVacanciesState): {
      return {
        ...DEFAULT_VACANCIES_STATE,
      };
    }
    default:
      return state;
  }
};

export const VACANCIES_KEY = 'vacancies';
