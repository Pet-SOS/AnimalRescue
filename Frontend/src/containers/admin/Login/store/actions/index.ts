import { createAction } from "typesafe-actions";

export const actionAdminLoginRequest = createAction(
    'ADMIN_FETCH_LOGIN',
    (resolve) => (data: any) => resolve(data)
);
export const actionAdminLoginRequestSuccess = createAction(
    'ADMIN_FETCH_LOGIN_SUCCESS',
    (resolve) => (data: any) => resolve({data})
  
);
export const actionAdminLoginRequestFailure = createAction(
    'ADMIN_FETCH_LOGIN_FAILURE',
    (resolve) => (error: Error) => resolve({error})
);