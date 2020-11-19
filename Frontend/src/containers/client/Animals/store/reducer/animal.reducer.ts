import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { genericRequestReducer } from '../../../../../api';
import {
  actionFetchAnimalItemRequest,
  actionFetchAnimalItemSuccess,
  actionFetchAnimalItemFailure,
  actionClearAnimalItemState,
} from '../actions/animal.actions';
import {
  IAnimalItemState,
  DEFAULT_ANIMAL_ITEM_STATE,
} from '../state/animal.state';

const fetchAnimalItemStateReducer = genericRequestReducer(
  actionFetchAnimalItemRequest,
  actionFetchAnimalItemSuccess,
  actionFetchAnimalItemFailure,
);

export const animalItemReducer = (
  state: IAnimalItemState = DEFAULT_ANIMAL_ITEM_STATE,
  action: AnyAction,
): IAnimalItemState => {
  switch (action.type) {
    case getType(actionFetchAnimalItemRequest): {
      return {
        ...state,
        requestState: fetchAnimalItemStateReducer(state.requestState, action),
        isLoading: true,
      };
    }
    case getType(actionFetchAnimalItemSuccess): {
      return {
        ...state,
        ...action.payload,
        requestState: fetchAnimalItemStateReducer(state.requestState, action),
        isLoading: false,
        isLoaded: true,
      };
    }
    case getType(actionFetchAnimalItemFailure): {
      return {
        ...state,
        requestState: fetchAnimalItemStateReducer(state.requestState, action),
        isLoading: false,
        isLoaded: false,
      };
    }
    case getType(actionClearAnimalItemState): {
      return {
        ...DEFAULT_ANIMAL_ITEM_STATE,
      };
    }
    default: {
      return state;
    }
  }
};

export const ANIMAL_ITEM_KEY = 'animalItem';
