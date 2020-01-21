import API from './index'

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
export enum AnimalsRequestFilterOperators { ALL = 'all', QE = 'eq' }
export enum AnimalsRequestSortOrder { ACS = 'acs', DECS = 'decs' }

export interface IAnimal {
  number: number
  name: string
  kindOfAnimal: AnimalKind | string
  gender: Gender | string
  description: string
  age: number
  imageIds: string[]
  tags: string[]
  id: string
  readonly?: boolean
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
  self: string | null;
}

export interface IAnimalsRequestFilterParams {
  fieldName: string;
  opeartor: AnimalsRequestFilterOperators;
  value: string | number;
}

export interface IAnimalsRequestSortParams {
  fieldName: string;
  order: AnimalsRequestSortOrder;
}

export interface IAnimalRequestParams {
  page?: number;
  size?: number;
  filter?: IAnimalsRequestFilterParams;
  sort?: IAnimalsRequestSortParams;
}

const prepareRequestParams = (requestParams?: IAnimalRequestParams) => {
  const params: any = {
    ...requestParams
  };
  if (!!requestParams?.filter) {
    params.filter = `${requestParams?.filter?.fieldName}~${requestParams?.filter?.opeartor}~('${requestParams?.filter?.value}')`
  }
  if (!!requestParams?.sort) {
    params.sort = `${requestParams?.sort?.fieldName}:${requestParams?.sort?.order};`
  }
  return params;
}

export async function fetchAnimals(requestParams?: IAnimalRequestParams): Promise<IAnimalsResponse[]> {
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