export interface ISnackbarState {
  isActive: boolean;
  message: string;
}

export const DEFAULT_SNACKBAR_STATE: ISnackbarState = {
  isActive: false,
  message: '',
};
