import API from './index';
import {IAnimal} from './animals';


export interface ISickAnimalsResponse {
    data: IAnimal[]
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    self: string;
    totalCount: number;
}

export async function fetchSickAnimals(): Promise< ISickAnimalsResponse[]> {
    const res = await API.get('stories');
    return res.data
}