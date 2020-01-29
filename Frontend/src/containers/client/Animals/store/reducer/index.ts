import { AnyAction } from "redux";
import { DEFAULT_ANIMALS_STATE, IAnimalsState } from "../state";
import { getType } from "typesafe-actions";
import { genericRequestReducer, DEFAULT_REQUEST_STATE } from "../../../../../api";
import {
  actionFetchAnimalsRequest,
  actionFetchAnimalsSuccess,
  actionFetchAnimalsFailure,
  actionFetchSickAnimals,
  actionFetchSickAnimalsSuccess,
  actionFetchSickAnimalFailUrl,
  actionFetchDogsRequest,
  actionFetchDogsSuccess,
  actionFetchDogsFailure,
  actionFetchCatsRequest,
  actionFetchCatsSuccess,
  actionFetchCatsFailure,
  actionFetchSavedAnimalsCount,
  actionFetchSavedAnimalsCountSuccess,
  actionFetchSavedAnimalsCountFailure,
  actionClearAnimalsList,
  actionClearDogs,
  actionClearCats,
  actionClearSavedAnimalsCount,
  actionClearSickAnimals,
  actionClearEntireAnimalsState
} from "../actions";
import { DEFAULT_ANIMALS } from './../state';

const fetchAnimalsRequestStateReducer = genericRequestReducer(
  actionFetchAnimalsRequest,
  actionFetchAnimalsSuccess,
  actionFetchAnimalsFailure,
);

const fetchSickAnimalsRequestStateReducer = genericRequestReducer(
  actionFetchSickAnimalsSuccess,
  actionFetchSickAnimals,
  actionFetchSickAnimalFailUrl
);

const fetchDogsRequestStateReducer = genericRequestReducer(
  actionFetchDogsRequest,
  actionFetchDogsSuccess,
  actionFetchDogsFailure,
);

const fetchCatsRequestStateReducer = genericRequestReducer(
  actionFetchCatsRequest,
  actionFetchCatsSuccess,
  actionFetchCatsFailure,
);

const fetchSavedAnimalsCountStateReducer = genericRequestReducer(
  actionFetchSavedAnimalsCount,
  actionFetchSavedAnimalsCountSuccess,
  actionFetchSavedAnimalsCountFailure
)

export const animalsReducer = (state: IAnimalsState = DEFAULT_ANIMALS_STATE, action: AnyAction): IAnimalsState => {
  switch (action.type) {
    case getType(actionFetchAnimalsRequest):
      return {
        ...state,
        animalsList: {
          ...state.animalsList,
          isLoading: true
        },
        animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
      };
    case getType(actionFetchAnimalsSuccess):
      return {
        ...state,
        animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action),
        animalsList: {
          ...action.payload.data,
          isLoaded: true,
          isLoading: false
        }
      };
    case getType(actionFetchAnimalsFailure):
      return {
        ...state,
        animalsList: {
          ...state.animalsList,
          isLoading: false,
          isLoaded: false
        },
        animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
      };
    case getType(actionClearAnimalsList): {
      return {
        ...state,
        animalsList: {...DEFAULT_ANIMALS},
        animalsListRequestState: { ...DEFAULT_REQUEST_STATE }
      }
    }
    case getType(actionFetchDogsRequest):
      return {
        ...state,
        dogsList: {
          ...state.dogsList,
          isLoading: true
        },
        dogsListRequestState: fetchDogsRequestStateReducer(state.dogsListRequestState, action)
      };
    case getType(actionFetchDogsSuccess):
      return {
        ...state,
        dogsListRequestState: fetchDogsRequestStateReducer(state.dogsListRequestState, action),
        dogsList: {
          ...action.payload,
          isLoaded: true,
          isLoading: false
        }
      };
    case getType(actionFetchDogsFailure):
      return {
        ...state,
        dogsList: {
          ...state.dogsList,
          isLoaded: false,
          isLoading: false
        },
        dogsListRequestState: fetchDogsRequestStateReducer(state.dogsListRequestState, action)
      };
    case getType(actionClearDogs): {
      return {
        ...state,
        dogsList: { ...DEFAULT_ANIMALS },
        dogsListRequestState: { ...DEFAULT_REQUEST_STATE }
      }
    }
    case getType(actionFetchCatsRequest):
      return {
        ...state,
        catsList: {
          ...state.catsList,
          isLoading: true
        },
        catsListRequestState: fetchCatsRequestStateReducer(state.catsListRequestState, action)
      };
    case getType(actionFetchCatsSuccess):
      return {
        ...state,
        catsListRequestState: fetchCatsRequestStateReducer(state.catsListRequestState, action),
        catsList: {
          ...action.payload,
          isLoading: false,
          isLoaded: true
        }
      };
    case getType(actionFetchCatsFailure):
      return {
        ...state,
        catsList: {
          ...action.payload,
          isLoading: false,
          isLoaded: false
        },
        catsListRequestState: fetchCatsRequestStateReducer(state.catsListRequestState, action)
      };
    case getType(actionClearCats): {
      return {
        ...state,
        catsList: { ...DEFAULT_ANIMALS },
        catsListRequestState: { ...DEFAULT_REQUEST_STATE }
      }
    }
    case getType(actionFetchSavedAnimalsCount):
      return {
        ...state,
        savedAnimalsCountRequestState: fetchSavedAnimalsCountStateReducer(state.savedAnimalsCountRequestState, action)
      };
    case getType(actionFetchSavedAnimalsCountSuccess):
      return {
        ...state,
        savedAnimalsCount: action.payload,
        savedAnimalsCountRequestState: fetchSavedAnimalsCountStateReducer(state.savedAnimalsCountRequestState, action)
      }
    case getType(actionFetchSavedAnimalsCountFailure):
      return {
        ...state,
        savedAnimalsCount: action.payload,
        savedAnimalsCountRequestState: fetchSavedAnimalsCountStateReducer(state.savedAnimalsCountRequestState, action)
      }
    case getType(actionClearSavedAnimalsCount): {
      return {
        ...state,
        savedAnimalsCount: { data: 0, self: '' },
        savedAnimalsCountRequestState: { ...DEFAULT_REQUEST_STATE }
      }
    }
    case getType(actionFetchSickAnimals):
      return {
        ...state,
        sickAnimalsList: {
          ...state.sickAnimalsList,
          isLoading: true
        },
        sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action)
      };
    case getType(actionFetchSickAnimalsSuccess):
      return {
        ...state,
        sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action),
        sickAnimalsList: {
          ...action.payload.data,
          isLoading: false,
          isLoaded: true
        }
      };
    case getType(actionFetchSickAnimalFailUrl):
      return {
        ...state,
        sickAnimalsList: {
          ...state.sickAnimalsList,
          isLoaded: false,
          isLoading: false
        },
        sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action),
      };
    case getType(actionClearSickAnimals): {
      return {
        ...state,
        sickAnimalsList: { ...DEFAULT_ANIMALS },
        sickAnimalsListState: { ...DEFAULT_REQUEST_STATE }
      }
    }
    case getType(actionClearEntireAnimalsState): {
      return {...DEFAULT_ANIMALS_STATE}
    }
    default:
      return state;
  }
}

export const ANIMALS_KEY = 'animals';