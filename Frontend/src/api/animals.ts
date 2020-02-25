import API from './index'
import {IRequestParams, prepareRequestParams} from './requestOptions'

const crateFormData = (data: Object) => {
    const formData = new FormData()
    for (let [key, value] of Object.entries(data)) {
        if (key === 'images') {
            for (let i = 0; i < value.length; i++) {
                formData.append(key, value[i])
            }
        } else {
            formData.append(key, value)
        }
    }
    return formData
}

export enum Gender {MALE = 'male', FEMALE = 'female', ANY='any'}

export enum AnimalKind { CAT = 'CAT', DOG = 'DOG', ANY='ANY'}
export enum AnimalGender{
    ANY='any',
    MALE = 'male',
    FEMALE = 'female', 
}
export enum AnimalFilterKind { 
    ANY='any',
    DOG = 'dog',
    CAT = 'cat',
}
export enum AnimalBreed {
    ANY='any',
    METIS='metis',
    ALABAI='alabai',
    SHEPHERD='shepherd',
    DOBERMAN='doberman',
    STAFFORD='stafford',
    DACHSHUND='dachshund'
}

export enum AnimalAge{
    ANY='any',
    TOONE = 'toOne',
    TOTHREE = 'toThree', 
    TOFIVE= 'toFive',
    FROMFIVE= 'fromFive'
}

export enum AnimalSize {
    ANY='any',
    SMALL='small',
    MEDIUM='medium',
    LARGE='large'
}

export enum Tags{
    VACCINATED='привит',
    READYTOTRAVEL='доступен для выезда заграницу',
    TREATMENT='на лечении',
    SPECIAL='особенный',
    STERILIZED='стерилизован',
    SAVED='спасен',
    THELOSS ='потеряшка'
}
export interface IAnimal {
  number: number
  name: string
  kindOfAnimal: string | AnimalKind
  gender: string | Gender
  description: string
  age: number
  imageIds: string[]
  tags: string[]
  coverImage: number
  birthday?: string;
  character: string
  id?: string 
  readonly?: boolean;
  images: []
  createdAt?: string;
}

export interface IAnimalResponse {
  data: IAnimal;
  self: string;
}

export const DEFAULT_ANIMAL: IAnimal = {
    number: 0,
    name: '',
    kindOfAnimal: '',
    gender: '',
    description: ' ',
    age: 0,
    imageIds: [],
    tags: [],
    character: '',
    birthday: '',
    coverImage: 0,
    images: []
}

export interface IAnimalsResponse {
    data: IAnimal[]
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    self: string;
    totalCount: number;
}

export interface ISavedAnimalsCountResponse {
    data: number;
    self: string;
}

export async function fetchAnimals(requestParams?: IRequestParams): Promise<IAnimalsResponse[]> {
    const res = await API.get('animals', {params: prepareRequestParams(requestParams)});
    return res.data
}

export async function updateAnimal(params: { animal: IAnimal, id?: string }): Promise<void> {
    const {animal, id} = params
    await API.put(`animals/${id}`, crateFormData(animal));
}

export async function postAnimal(params: { animal: IAnimal }): Promise<void> {
    await API.post(`animals`, crateFormData(params.animal));
}

export async function deleteAnimal(id: string): Promise<void> {
    await API.delete(`animals/${id}`);
}

export async function fetchSavedAnimalsCount(): Promise<ISavedAnimalsCountResponse> {
  const res = await API.get('animals/counter');
  return res.data
}

export async function fetchAnimalItem(id: string): Promise<IAnimalResponse> {
  const res = await API.get(`animals/${id}`);
  return res.data
}
