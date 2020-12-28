import { createAction } from 'typesafe-actions';

export const actionTokenRefresh = createAction(
  'TOKEN_REFRESH',
  (resolve) => () => resolve()
);
