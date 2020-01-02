import API from './index'
// @ts-ignore
import json2formdata from 'json2formdata';

export interface IAnimal {
    number: number
    name: string
    kindOfAnimal: string
    gender: string
    description: string
    age: number
    imageIds: string[]
    tags: string[]
    id: string
    readonly?: boolean
}

export interface IAnimalsResponse {
    data: IAnimal[]
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    self: string;
    totalCount: number;
}

export async function fetchAnimals(): Promise<IAnimalsResponse[]> {
    const res = await API.get('animals');
    return res.data
}

export async function updateAnimal(params: { animal: IAnimal }): Promise<void> {
    await API.put('animals', json2formdata(params.animal));
}
