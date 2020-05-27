export interface IListResponse<T> {
    data: T[]
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    self: string;
    totalCount: number;
}

export const DEFAULT_LIST_RESPONSE: IListResponse<any> = {
    data: [],
    pageCount: -1,
    pageNumber: -1,
    pageSize: -1,
    self: '',
    totalCount: -1,
};
