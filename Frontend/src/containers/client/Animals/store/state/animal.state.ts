import { IAnimalResponse } from './../../../../../api/animals';
import { IRequestState, DEFAULT_REQUEST_STATE } from '../../../../../api';

export interface IAnimalItemState extends IAnimalResponse {
  isLoading: boolean;
  isLoaded: boolean;
  requestState: IRequestState;
}

export const DEFAULT_ANIMAL_ITEM_STATE: IAnimalItemState = {
  data: {
    number: 0,
    name: '',
    kindOfAnimal: '',
    gender: '',
    description: '',
    imageIds: [],
    tags: [],
    character: '',
    status: '',
    locationTypeId: '',
    locationName: '',
    bannerText: '',
    isDonationActive: false,
    birthday: '',
    coverImage: 0,
    createdAt: '',
    images: [],
    adoptiveName: '',
    adoptivePhone: '',
    adoptionContractFileId: '',
  },
  self: '',
  isLoaded: false,
  isLoading: false,
  requestState: { ...DEFAULT_REQUEST_STATE },
};
