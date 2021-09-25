import { IConfigState, DEFAULT_CONFIG_STATE } from '../state/config.state';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import {
  actionGetApiConfig,
  actionGetApiConfigSuccess,
  actionGetApiConfigError,
  actionClearApiConfig,
} from '../actions/config.actions';

export const configReducer = (
  state: IConfigState = DEFAULT_CONFIG_STATE,
  action: AnyAction,
): IConfigState => {
  switch (action.type) {
    case getType(actionGetApiConfig): {
      return {
        ...state,
        isLoading: true,
      };
    }
    case getType(actionGetApiConfigSuccess):
      return {
        ...state,
        data: {
          ...action.payload,
        },
        isLoading: false,
        isLoaded: true,
      };
    case getType(actionGetApiConfigError):
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
      };
    case getType(actionClearApiConfig): {
      return {
        ...DEFAULT_CONFIG_STATE,
      };
    }
    default:
      return state;
  }
};

export const CONFIG_KEY = 'config';
