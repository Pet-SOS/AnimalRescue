import { IResponceSignIn } from '../../../../../api/login';
import {
  DEFAULT_REQUEST_STATE,
  IRequestState,
} from '../../../../../api/requestState/defaultRequestState';

export interface ILoginPageState {
  accountSignIn: IResponceSignIn;
  accountSignInRequestState: IRequestState;
}

export const DEFAULT_LOGIN_STATE = {
  token: '',
  expireDate: '',
  user: {
    email: '',
    userId: '',
    userName: '',
    profilePhoto: '',
    userRole: '',
  },
};

export const DEFAULT_LOGIN_STATE_PAGE_STATE = {
  accountSignIn: { ...DEFAULT_LOGIN_STATE },
  accountSignInRequestState: { ...DEFAULT_REQUEST_STATE },
};
