import { createAction } from 'typesafe-actions';
import { IAPIConfig } from '../../api/config';

export const actionGetApiConfig = createAction(
  'GET_API_CONFIG_REQUEST',
  resolve => () => resolve(),
);

export const actionGetApiConfigSuccess = createAction(
  'GET_API_CONFIG_SUCCESS',
  resolve => (config: IAPIConfig) => resolve(config),
);

export const actionGetApiConfigError = createAction(
  'GET_API_CONFIG_ERROR',
  resolve => (error: Error) => resolve({ error }),
);

export const actionClearApiConfig = createAction('CLEAR_API_CONFIG');
