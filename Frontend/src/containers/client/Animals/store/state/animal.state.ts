import { IAnimalResponse } from './../../../../../api/animals';
import { IRequestState, DEFAULT_REQUEST_STATE } from "../../../../../api";
import { DEFAULT_SINGLE_TAG } from '../../../../../store/state/tags.state';
import { DEFAULT_SINGLE_LOCATION } from '../../../../admin/Locations/store/state/index';

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
    age: 0,
    imageIds: [],
    tags: [],
    character: '',
    status: DEFAULT_SINGLE_TAG,
    locationType: DEFAULT_SINGLE_LOCATION,
    bannerText: '',
    isDonationActive: false,
    birthday: '',
    coverImage: 0,
    createdAt: '',
    images: [],
  },
  self: '',
  isLoaded: false,
  isLoading: false,
  requestState: { ...DEFAULT_REQUEST_STATE }
};
