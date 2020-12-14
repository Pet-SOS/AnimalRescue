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
    const res = await API.post('Account/signIn', data);
    localStorage.setItem('jwt-token', res.data.token);
    localStorage.setItem('refresh-token', res.data.refreshToken);
    return res.data
}
  
export async function requestRefreshToken(): Promise<any> {
    const token = localStorage.getItem('jwt-token');
    const refreshToken = localStorage.getItem('refresh-token');
    try {
        const res = await API.post('Account/refreshToken', { token, refreshToken });
        console.log('res', res);
        if (res.data.token && res.data.refreshToken){
            localStorage.setItem('jwt-token', res.data.token);
            localStorage.setItem('refresh-token', res.data.refreshToken);
        }
        return res;
    } catch(e) {
        return e;
    }
}
