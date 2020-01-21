import {AnyAction} from "redux";
import {DEFAULT_HOME_PAGE_STATE, IHomePageState} from "../state";
import {getType} from "typesafe-actions";
import {genericRequestReducer} from "../../../../../api";
import {
    actionHomeFetchAnimalsRequest,
    actionHomeFetchAnimalsSuccess,
    actionHomeFetchAnimalsFailure,
    actionIsActivePopup,
    actionHomeFetchSickAnimals,
    actionHomeFetchSickAnimalsSuccess,
    actionHomeFetchSickAnimalFailUrl,
    actionHomeFetchDogsRequest,
    actionHomeFetchDogsSuccess,
    actionHomeFetchDogsFailure,
    actionHomeFetchCatsRequest,
    actionHomeFetchCatsSuccess,
    actionHomeFetchCatsFailure,
    actionHomeFetchSavedAnimalsCount,
    actionHomeFetchSavedAnimalsCountSuccess,
    actionHomeFetchSavedAnimalsCountFailure,
    actionHomeFetchBlogListRequest,
    actionHomeFetchBlogListFailure,
    actionHomeFetchBlogListSuccess
} from "../actions";

const fetchAnimalsRequestStateReducer = genericRequestReducer(
    actionHomeFetchAnimalsRequest,
    actionHomeFetchAnimalsSuccess,
    actionHomeFetchAnimalsFailure,
    actionIsActivePopup,
);

const fetchSickAnimalsRequestStateReducer = genericRequestReducer(
    actionHomeFetchSickAnimalsSuccess,
    actionHomeFetchSickAnimals,
    actionHomeFetchSickAnimalFailUrl
);

const fetchDogsRequestStateReducer = genericRequestReducer(
  actionHomeFetchDogsRequest,
  actionHomeFetchDogsSuccess,
  actionHomeFetchDogsFailure,
);

const fetchCatsRequestStateReducer = genericRequestReducer(
  actionHomeFetchCatsRequest,
  actionHomeFetchCatsSuccess,
  actionHomeFetchCatsFailure,
);

const fetchSavedAnimalsCountStateReducer = genericRequestReducer(
  actionHomeFetchSavedAnimalsCount,
  actionHomeFetchSavedAnimalsCountSuccess,
  actionHomeFetchSavedAnimalsCountFailure
)

const fetchBlogListStateReducer = genericRequestReducer(
  actionHomeFetchBlogListRequest,
  actionHomeFetchBlogListSuccess,
  actionHomeFetchBlogListFailure
)

export const homePageReducer = (state:IHomePageState = DEFAULT_HOME_PAGE_STATE, action: AnyAction) => {
  switch (action.type) {
    case getType(actionHomeFetchAnimalsRequest):
      return {
          ...state,
          animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
      };
    case getType(actionHomeFetchAnimalsSuccess):
      return {
          ...state,
          animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action),
          animalsList: action.payload.data
      };
    case getType(actionHomeFetchAnimalsFailure):
      return {
          ...state,
          animalsListRequestState: fetchAnimalsRequestStateReducer(state.animalsListRequestState, action)
      };
    case getType(actionHomeFetchDogsRequest):
      return {
        ...state,
        dogsListRequestState: fetchDogsRequestStateReducer(state.dogsListRequestState, action)
      };
    case getType(actionHomeFetchDogsSuccess):
      return {
        ...state,
        dogsListRequestState: fetchDogsRequestStateReducer(state.dogsListRequestState, action),
        dogsList: action.payload
      };
    case getType(actionHomeFetchDogsFailure):
      return {
        ...state,
        dogsListRequestState: fetchDogsRequestStateReducer(state.dogsListRequestState, action)
      };
    case getType(actionHomeFetchCatsRequest):
      return {
        ...state,
        catsListRequestState: fetchCatsRequestStateReducer(state.catsListRequestState, action)
      };
    case getType(actionHomeFetchCatsSuccess):
      return {
        ...state,
        catsListRequestState: fetchCatsRequestStateReducer(state.catsListRequestState, action),
        catsList: action.payload
      };
    case getType(actionHomeFetchCatsFailure):
      return {
        ...state,
        catsListRequestState: fetchCatsRequestStateReducer(state.catsListRequestState, action)
      };
    case getType(actionHomeFetchSavedAnimalsCount):
      return {
        ...state,
        savedAnimalsCountRequestState: fetchSavedAnimalsCountStateReducer(state.savedAnimalsCountRequestState, action)
      };
    case getType(actionHomeFetchSavedAnimalsCountSuccess):
      return {
        ...state,
        savedAnimalsCount: action.payload,
        savedAnimalsCountRequestState: fetchSavedAnimalsCountStateReducer(state.savedAnimalsCountRequestState, action)
      }
    case getType(actionHomeFetchSavedAnimalsCountFailure):
      return {
        ...state,
        savedAnimalsCount: action.payload,
        savedAnimalsCountRequestState: fetchSavedAnimalsCountStateReducer(state.savedAnimalsCountRequestState, action)
      }
    case getType(actionIsActivePopup):
      return {
          ...state,
          isActivePopup: action.payload.data
      };
      case getType(actionHomeFetchSickAnimals):
        return {
            ...state,
            sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action)
        };
    case getType(actionHomeFetchSickAnimalsSuccess):
        return {
            ...state,
            sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action),
            sickAnimalsList: action.payload.data
        };
    case getType(actionHomeFetchSickAnimalFailUrl):
        return {
            ...state,
            sickAnimalsListState: fetchSickAnimalsRequestStateReducer(state.sickAnimalsListState, action),
        };
    case getType(actionHomeFetchBlogListRequest): {
      return {
        ...state,
        blogListState: fetchBlogListStateReducer(state.blogListRequestState, action)
      }
    }
    case getType(actionHomeFetchBlogListSuccess):
      return {
        ...state,
        blogListRequestState: fetchBlogListStateReducer(state.blogListRequestState, action),
        blogList: action.payload
      };
    case getType(actionHomeFetchBlogListFailure):
      return {
        ...state,
        blogListRequestState: fetchBlogListStateReducer(state.blogListRequestState, action)
      };
    default:
        return state;
  }
};

export const HOME_PAGE_KEY = 'homePage';