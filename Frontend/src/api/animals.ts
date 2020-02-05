import API from './index'
import { IRequestParams, prepareRequestParams } from './requestOptions'

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

export enum Gender {MALE = 'male', FEMALE = 'female'}
export enum AnimalKind { CAT = 'cat', DOG = 'dog' }

export interface IAnimal {
  number: number
  name: string
  kindOfAnimal: string | AnimalKind
  gender: string | Gender
  description: string
  age: number
  imageIds: string[]
  tags: string[]
  id?: string 
  readonly?: boolean;
  images: []
  createdAt?: string;
}

export interface IAnimalResponse {
  data: IAnimal;
  self: string;
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
  const res = await API.get('animals', { params: prepareRequestParams(requestParams) });
  return res.data
}

export async function updateAnimal(params: { animal: IAnimal }): Promise<void> {
    await API.put('animals', crateFormData(params.animal));
}

export async function fetchSavedAnimalsCount(): Promise<ISavedAnimalsCountResponse> {
  const res = await API.get('animals/counter');
  return res.data
}

export async function fetchAnimalItem(id: string): Promise<IAnimalResponse> {
  const res = await API.get(`animals/${id}`);
  return res.data
}