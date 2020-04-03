import { ICustomAppState } from '../state';
import { SNACKBAR_KEY } from '../reducers/snackbar.reducer';

export const selectIsSnackbarActive = (state: ICustomAppState): boolean => state[SNACKBAR_KEY].isActive;
export const selectSnackbarMessage = (state: ICustomAppState): string => state[SNACKBAR_KEY].message;