import { createAction } from 'typesafe-actions';

export const actionShowSnackbar = createAction(
  'SHOW_SNACKBAR',
  (resolve) => (message: string) => resolve(message)
);

export const actionHideSnackbar = createAction(
  'HIDE_SNACKBAR',
  (resolve) => () => resolve()
);