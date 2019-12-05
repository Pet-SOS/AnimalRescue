export interface ICustomAppState<T = any> {
    [key: string]: T;
}

export const defaultCustomAppState: ICustomAppState = {};