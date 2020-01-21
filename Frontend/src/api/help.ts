import API from './index';
import {IAnimal} from './animals';

export enum AllTag {TREATMENT = 'treatment', SAVED = 'saved'}
export interface ISickAnimalsResponse {
    data: IAnimal[]
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    self: string;
    totalCount: number;
}
const params = {
    Filter: `tags~all~('${AllTag.TREATMENT}')`
}
export async function fetchSickAnimals(): Promise< ISickAnimalsResponse[]> {
    const res = await API.get(`animals`, {params});
    return res.data
}