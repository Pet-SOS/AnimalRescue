import API from './index'


export interface IAnimal {
    number: number
    name: string
    kindOfAnimal: string
    gender: string
    description: string
    age: number
    imageLinks: string[]
    tags: string[]
    id: string
    readonly: boolean
}

export interface IAnimalsResponse {
    data: IAnimal[]
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    self: string;
    totalCount: number;
}

export async function fetchAnimals (): Promise<IAnimalsResponse[]> {
    const res = await API.get('animals');
    return res.data
}