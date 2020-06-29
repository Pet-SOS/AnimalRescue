import {API} from './index';
import {IRequestParams, prepareRequestParams, AllTag} from './requestOptions';

export enum BlogTypes {BLOG = 'blog', ARTICLE = 'article', STORY = 'story'}

export interface IBlogItem {
    type: BlogTypes | string;
    title: string;
    body: string;
    imageIds: string[];
    tags: AllTag[];
    createdAt?: string;
    modifiedAt?: string;
    id?: string;
}

export interface IBlogItemResponse {
    data: IBlogItem;
    self: string;
}

export interface IBlogListResponse {
    data: IBlogItem[];
    totalCount: number;
    pageNumber: number;
    pageCount: number;
    pageSize: number;
    self: string;
}


const mapToBlogRequest = (data : IBlogItem) => {
    // const formData = new FormData();
    // formData.append('Type', data.type);
    // formData.append('Title', data.title);
    // formData.append('Body', data.body);
    // formData.append('Images', data.imageIds);
    // formData.append('Tags', data.tags);
    // return formData;

};

export async function fetchBlogList(requestParams?: IRequestParams): Promise<IBlogListResponse[]> {
    const res = await API.get('blogs', {params: prepareRequestParams(requestParams)});
    return res.data
}

export async function fetchBlogItem(id: string): Promise<IBlogItemResponse> {
    const res = await API.get(`blogs/${id}`);
    return res.data
}


export async function deleteBlogItem(id: string): Promise<void> {
    //TODO
    await API.delete(`blogs/${id}`);
}


export async function updateBlogItem(id: string): Promise<void> {
    //TODO
    const res = await API.put(`blogs/${id}`);
    return res.data
}
