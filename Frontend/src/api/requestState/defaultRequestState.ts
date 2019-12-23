import { ERequestStatus } from './enumRequestState';

export interface IRequestState {
    time?: number;
    status: ERequestStatus;
    error: string;
}

export const DEFAULT_REQUEST_STATE: IRequestState = {
    time: 0,
    status: ERequestStatus.NONE,
    error: ''
};