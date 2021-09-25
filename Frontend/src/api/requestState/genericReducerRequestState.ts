import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { ActionCreator } from 'typesafe-actions/src/types';
import { DEFAULT_REQUEST_STATE, IRequestState } from './defaultRequestState';
import { ERequestStatus } from './enumRequestState';

export const genericRequestReducer = (
  request: ActionCreator<string>,
  success: ActionCreator<string>,
  failure: ActionCreator<string>,
  reset?: ActionCreator<string>,
): ((state: IRequestState, action: AnyAction) => any) => {
  return (
    state: IRequestState = { ...DEFAULT_REQUEST_STATE },
    action: AnyAction,
  ) => {
    switch (action.type) {
      case getType(request):
        return {
          ...state,
          status: ERequestStatus.REQUEST,
          error: null,
        };

      case getType(success):
        return {
          ...state,
          status: ERequestStatus.SUCCESS,
          error: null,
        };

      case getType(failure):
        let status;
        let error;
        status = ERequestStatus.FAILURE;
        error = (action.payload.error && action.payload.error.message) || '';
        return {
          ...state,
          status: status,
          error: error,
        };

      default:
        if (reset && getType(reset)) {
          return {
            ...DEFAULT_REQUEST_STATE,
          };
        } else {
          return state;
        }
    }
  };
};
