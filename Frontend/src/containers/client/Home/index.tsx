import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {ICustomAppState} from "../../../store/state";
import {
  selectAnimalsList,
  selectDogsList,
  selectSavedAnimalsCount,
  selectCatsList,
  selectSickAnimals,
  selectBlogList} from "./store/selectors";
import { AnimalKind } from "../../../api/animals";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
    actionHomeFetchSickAnimals,
    actionHomeFetchAnimalsRequest,
    actionHomeFetchDogsRequest,
    actionHomeFetchCatsRequest,
    actionHomeFetchSavedAnimalsCount,
    actionHomeFetchBlogListRequest,
} from "./store/actions";
import { IRequestParams } from "../../../api/requestOptions";

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  blogList: selectBlogList(state),
  catsList: selectCatsList(state),
  dogsList: selectDogsList(state),
  sickAnimalsList: selectSickAnimals(state),
  savedAnimalsCount: selectSavedAnimalsCount(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({ 
  fetchAnimalsRequest: (kind?: AnimalKind, pageParams?: IRequestParams) => {
    switch (kind) {
      case AnimalKind.CAT: {
        return dispatch(actionHomeFetchCatsRequest(pageParams));
      }
      case AnimalKind.DOG: {
        return dispatch(actionHomeFetchDogsRequest(pageParams));
      }
      default: {
        return dispatch(actionHomeFetchAnimalsRequest(pageParams))
      }
    }
  },
  fetchSavedAnimalsCount: () => dispatch(actionHomeFetchSavedAnimalsCount()),
  fetchSickAnimals: () => dispatch(actionHomeFetchSickAnimals()),
  fetchBlogList: (pageParams?: IRequestParams) => dispatch(actionHomeFetchBlogListRequest(pageParams)),
})

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageMain);
