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


const mapToBlogRequest = (data: IBlogItem) => {
    const formData = new FormData();
    formData.append('Type', data.type);
    formData.append('Title', data.title);
    formData.append('Body', data.body);
    for (let img in data.imageIds) {
        formData.append('Images', img);
    }
    for (let tag in data.tags) {
        formData.append('Tags', tag);
    }
    return formData;

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


export async function updateBlogItem(data: IBlogItem): Promise<void> {
    await API.put(`blogs/${data.id}`, mapToBlogRequest(data));
}

export async function createBlogItem(data: IBlogItem): Promise<IBlogItem> {
    let response = await API.post(`blogs/${data.id}`, mapToBlogRequest(data));
    return response.data;
}
