import API from './index'

export enum BlogType {ARTICLE = 'article', STORY = 'story'}

export interface IBlog {
    type: string | BlogType
    title: string
    body: string
    imageIds: string[]
    tags: string[]
    createdAt: string
    id: string
}

export interface IBlogsResponse {
    data: IBlog[]
}

export async function fetchBlogs(): Promise<IBlogsResponse[]> {
    const res = await API.get('blogs');
    return res.data
}