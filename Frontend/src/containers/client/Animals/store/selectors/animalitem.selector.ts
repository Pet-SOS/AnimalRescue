import { ICustomAppState } from '../../../../../store/state';
import { IAnimalItemState } from '../state/animal.state';
import { ANIMAL_ITEM_KEY } from '../reducer/animal.reducer';

export const selectAnimalItem = (state: ICustomAppState): IAnimalItemState => state[ANIMAL_ITEM_KEY];