import { API } from './index';
import {IRequestParams, prepareRequestParams, prepareReadyForAdoptionRequestParams} from './requestOptions';
import { ILocationType } from './admin/locations';
import { DEFAULT_SINGLE_LOCATION } from '../containers/admin/Locations/store/state';
import {adminAnimalsAdapter, animalItemAdapter} from "../dto";

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
    ANY='ANY',
    MALE = 'MALE',
    FEMALE = 'FEMALE',
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

export enum AnimalAge {
    ANY='any',
    TOONE = 'toOne',
    TOTHREE = 'toThree',
    TOFIVE= 'toFive',
    FROMFIVE= 'fromFive'
}

export enum AnimalSize {
    ANY='ANY',
    SMALL_DOG = 'SMALL_DOG',
    MEDIUM_DOG = 'MEDIUM_DOG',
    LARGE_DOG = 'LARGE_DOG'
}

export enum FilterType {
    ANY= 'ANY',
    KIND_OF_ANIMAL = 'kindOfAnimal',
    BREED = 'breed',
    GENDER = 'gender',
    AGE = 'age',
    SIZE = 'dogsize',
    STERILIZED = 'STERILIZED',
    VACCINATED = 'VACCINATED',
    READYTOABROAD = 'READYTOABROAD'
}

export enum EditableTags {
  STERILIZED = 'STERILIZED',
  VACCINATED = 'VACCINATED',
  READYTOABROAD = 'READYTOABROAD'
}

export enum Tags{
    VACCINATED='привит',
    READYTOABROAD='доступен для выезда заграницу',
    TREATMENT='на лечении',
    SPECIAL='особенный',
    STERILIZED='стерилизован',
    SAVED='спасен',
    THELOSS ='потеряшка'
}
export interface IAnimal {
  number: number;
  name: string;
  kindOfAnimal: string | AnimalKind;
  gender: string | Gender;
  description: string;
  imageIds: string[];
  previousImageIds?: string[];
  tags: string[];
  coverImage: number;
  birthday?: string;
  character: string;
  status: string;
  locationType: ILocationType;
  locationTypeId: string;
  locationName: string;
  bannerText: string;
  isDonationActive: boolean;
  id?: string;
  readonly?: boolean;
  images: [];
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
    imageIds: [],
    previousImageIds: [],
    tags: [],
    character: '',
    status: '',
    locationType: DEFAULT_SINGLE_LOCATION,
    locationTypeId: '',
    locationName: '',
    bannerText: '',
    isDonationActive: false,
    birthday: '',
    coverImage: 0,
    images: [],
    id: ''
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

export async function fetchAdminAnimals(requestParams?: IRequestParams): Promise<IAnimalsResponse> {
  const response = await API.get('animals', {params: prepareRequestParams(requestParams)});
  return new adminAnimalsAdapter().toModel(response.data);
}

export async function fetchAnimals(requestParams?: IRequestParams): Promise<IAnimalsResponse[]> {
  const response = await API.get('animals', {params: prepareReadyForAdoptionRequestParams(requestParams)});
  return response.data
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
  const response = await API.get('animals/counter');
  return response.data
}

export async function fetchAnimalItem(id: string): Promise<IAnimalResponse> {
  const response = await API.get(`animals/${id}`);
  return new animalItemAdapter().toModel(response.data);
}

export async function fetchFavoriteAnimals(animalIds: string[]): Promise<IAnimalsResponse[]> {
  const res = await API.post(`animals/bunch`, {animalIds});
  return res.data
}
