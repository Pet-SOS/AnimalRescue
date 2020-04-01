import { getType } from 'typesafe-actions';
import { AnyAction } from 'redux';

import { ISnackbarState, DEFAULT_SNACKBAR_STATE } from '../state/snackbar.state';
import { actionShowSnackbar, actionHideSnackbar } from '../actions/snackbar.actions';

export const snackbarReducer = (state: ISnackbarState = DEFAULT_SNACKBAR_STATE, action: AnyAction): ISnackbarState => {
  switch (action.type) {
    case getType(actionShowSnackbar): {
      return {
        ...state,
        isActive: true,
        message: action.payload
      }
    }
    case getType(actionHideSnackbar): {
      return {
        ...state,
        isActive: false,
        message: '',
      }
    }
    default: {
      return state;
    }
  }
}

export const SNACKBAR_KEY = 'snackbar';