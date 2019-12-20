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

export const fetchAnimals = async (getAnimals: Function): Promise<IAnimal[]> => {
    const response = await API.get('animals')
    return getAnimals(response.data.data)
}
