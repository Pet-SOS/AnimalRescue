import { BaseAdapter } from './base-adapter';
import {
  AnimalKind,
  Gender,
  IAnimal,
  IAnimalMultiLangProp,
  IAnimalName,
  IAnimalResponse,
  IAnimalsResponse,
} from '../api/animals';
import { ITag } from '../api/tags';

export interface IAnimalDataDTO {
  number: number;
  names: IAnimalName[];
  kindOfAnimal: string | AnimalKind;
  gender: string | Gender;
  description: IAnimalMultiLangProp[];
  imageIds: string[];
  previousImageIds?: string[];
  tags: string[];
  coverImage: number;
  birthday?: string;
  character: IAnimalMultiLangProp[];
  status: ITag;
  locationTypeId: string;
  locationName: string;
  bannerText: IAnimalMultiLangProp[];
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

export interface IAnimalDTO {
  data: IAnimalDataDTO;
  self: string;
}

export interface IAdminAnimalsDTO {
  data: IAnimalDataDTO[];
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  self: string;
  totalCount: number;
}

export class animalAdapter extends BaseAdapter<IAnimal, IAnimalDataDTO, any> {
  protected convertToModel(dto: IAnimalDataDTO): IAnimal {
    const status = dto.status?.id;
    return {
      ...dto,
      status: !!status ? status : '',
    };
  }
}

export class animalItemAdapter extends BaseAdapter<
  IAnimalResponse,
  IAnimalDTO,
  any
> {
  protected convertToModel(dto: IAnimalDTO): IAnimalResponse {
    return {
      ...dto,
      data: new animalAdapter().toModel(dto.data),
    };
  }
}

export class adminAnimalsAdapter extends BaseAdapter<
  IAnimalsResponse,
  IAdminAnimalsDTO,
  any
> {
  protected convertToModel(dto: IAdminAnimalsDTO): IAnimalsResponse {
    return {
      ...dto,
      data: dto.data.map((animalItemDto: IAnimalDataDTO) =>
        new animalAdapter().toModel(animalItemDto),
      ),
    };
  }
}
