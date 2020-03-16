import API from './index';

export interface IResponceSignIn{
    token: string;
    expireDate: string;
    user: {
        email: string;
        userId: string;
        userName: string;
        profilePhoto: string;
        userRole: string;
    }
}

export interface IDataSignIn {
    email: string; //admin@animalrescue.com
    phoneNumber?: string;
    password: string; //TestPassword123#
    rememberMe?: boolean;
}

export async function fetchlogin(data:any): Promise<any> {
    debugger
    const res = await API.post('Account/signIn', data);
    localStorage.setItem('jwt-token', res.data.token);
    return res.data
}
  