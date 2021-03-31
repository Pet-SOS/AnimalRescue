import { API } from './index';
import {
  IRequestParams,
  prepareRequestParams,
  prepareReadyForAdoptionRequestParams,
} from './requestOptions';
import { adminAnimalsAdapter, animalItemAdapter } from '../dto';

const crateFormData = (data: Object) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    if (key === 'images') {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else if (key === 'names') {
      for (let i = 0; i < value.length; i++) {
        let flagHasEmptyValues = false;
        for (let innerValue of Object.values(value[i])) {
          if (innerValue === '') {
            flagHasEmptyValues = true;
            break;
          }
        }
        if (!flagHasEmptyValues) {
          for (let [innerKey, innerValue] of Object.entries(value[i])) {
            // @ts-ignore
            formData.append(`Names[${i}].${innerKey}`, innerValue);
          }
        }
      }
    } else {
      formData.append(key, value);
    }
  }
  return formData;
};

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any',
}

export enum AnimalKind {
  CAT = 'CAT',
  DOG = 'DOG',
  ANY = 'ANY',
}
export enum AnimalGender {
  ANY = 'ANY',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum AnimalFilterKind {
  ANY = 'any',
  DOG = 'dog',
  CAT = 'cat',
}
export enum AnimalBreed {
  ANY = 'any',
  METIS = 'metis',
  ALABAI = 'alabai',
  SHEPHERD = 'shepherd',
  DOBERMAN = 'doberman',
  STAFFORD = 'stafford',
  DACHSHUND = 'dachshund',
}

export enum AnimalAge {
  ANY = 'any',
  TOONE = 'toOne',
  TOTHREE = 'toThree',
  TOFIVE = 'toFive',
  FROMFIVE = 'fromFive',
}

export enum AnimalSize {
  ANY = 'ANY',
  SMALL_DOG = 'SMALL_DOG',
  MEDIUM_DOG = 'MEDIUM_DOG',
  LARGE_DOG = 'LARGE_DOG',
}

export enum FilterType {
  ANY = 'ANY',
  KIND_OF_ANIMAL = 'kindOfAnimal',
  BREED = 'breed',
  GENDER = 'gender',
  AGE = 'age',
  SIZE = 'dogsize',
  STERILIZED = 'STERILIZED',
  VACCINATED = 'VACCINATED',
  READYTOABROAD = 'READYTOABROAD',
}

export enum EditableTags {
  STERILIZED = 'STERILIZED',
  VACCINATED = 'VACCINATED',
  READYTOABROAD = 'READYTOABROAD',
}

export enum Tags {
  VACCINATED = 'привит',
  READYTOABROAD = 'доступен для выезда заграницу',
  TREATMENT = 'на лечении',
  SPECIAL = 'особенный',
  STERILIZED = 'стерилизован',
  SAVED = 'спасен',
  THELOSS = 'потеряшка',
}

export interface IAnimalName {
  lang: string;
  value: string;
}

export interface IAnimal {
  number: number;
  names: IAnimalName[];
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
  locationTypeId: string;
  locationName: string;
  bannerText: string;
  isDonationActive: boolean;
  id?: string;
  readonly?: boolean;
  images: [];
  createdAt?: string;
  adoptiveName: string;
  adoptivePhone: string;
  adoptionContractFile: Object;
  adoptionContractFileId: string;
}

export interface IAnimalResponse {
  data: IAnimal;
  self: string;
}

export const DEFAULT_ANIMAL: IAnimal = {
  number: 0,
  names: [],
  kindOfAnimal: '',
  gender: '',
  description: ' ',
  imageIds: [],
  previousImageIds: [],
  tags: [],
  character: '',
  status: '',
  locationTypeId: '',
  locationName: '',
  bannerText: '',
  isDonationActive: false,
  birthday: '',
  coverImage: 0,
  images: [],
  id: '',
  adoptiveName: '',
  adoptivePhone: '',
  adoptionContractFile: {},
  adoptionContractFileId: '',
};

export interface IAnimalsResponse {
  data: IAnimal[];
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

export async function fetchAdminAnimals(
  requestParams?: IRequestParams,
): Promise<IAnimalsResponse> {
  const response = await API.get('animals', {
    params: prepareRequestParams(requestParams),
  });
  return new adminAnimalsAdapter().toModel(response.data);
}

export async function fetchAnimals(
  requestParams?: IRequestParams,
): Promise<IAnimalsResponse[]> {
  const response = await API.get('animals', {
    params: prepareReadyForAdoptionRequestParams(requestParams),
  });
  return response.data;
}

export async function updateAnimal(params: {
  animal: IAnimal;
  id?: string;
}): Promise<void> {
  const { animal, id } = params;
  await API.put(`animals/${id}`, crateFormData(animal));
}

export async function postAnimal(params: { animal: IAnimal }): Promise<void> {
  await API.post(`animals`, crateFormData(params.animal));
}

export async function deleteAnimal(id: string): Promise<void> {
  await API.delete(`animals/${id}`);
}

export async function postAnimalAdoptionRequest(params: {
  AnimalId: string | undefined;
  AnimalName: string;
  AdoptiveName: string;
  PhoneNumber: string;
}): Promise<any> {
  return API.post(`Messages/adoptAnimal`, params);
}

export async function fetchSavedAnimalsCount(): Promise<
  ISavedAnimalsCountResponse
> {
  const response = await API.get('animals/counter');
  return response.data;
}

export async function fetchAnimalItem(id: string): Promise<IAnimalResponse> {
  const response = await API.get(`animals/${id}`);
  return new animalItemAdapter().toModel(response.data);
}

export async function fetchFavoriteAnimals(
  animalIds: string[],
): Promise<IAnimalsResponse[]> {
  const res = await API.post(`animals/bunch`, { animalIds });
  return res.data;
}

export async function fetchAdoptionContractDocument(id: string): Promise<any> {
  const res = await API.get(`Documents/${id}`, { responseType: 'arraybuffer' });
  return res;
}
