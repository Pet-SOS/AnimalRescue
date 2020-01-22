import { Dispatch } from "react";
import { AnyAction } from "redux";
import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {ICustomAppState} from "../../../store/state";
import { AnimalKind } from "../../../api/animals";
import { IRequestParams, AllTag } from "../../../api/requestOptions";
import {
  selectSavedInfoCard,
  selectBlogList,
  selectBlogListSaved
} from "./store/selectors";
import {
    actionFetchInfoCard,
    actionHomeFetchBlogListRequest,
    actionHomeFetchBlogListSavedRequest,
} from "./store/actions";
import {
  selectAnimalsList,
  selectCatsList,
  selectDogsList,
  selectSickAnimals,
  selectSavedAnimalsCount
} from "../Animals/store/selectors";
import {
  actionFetchCatsRequest,
  actionFetchDogsRequest,
  actionFetchAnimalsRequest,
  actionFetchSavedAnimalsCount,
  actionFetchSickAnimals
} from "../Animals/store/actions";

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  blogList: selectBlogList(state),
  blogListSaved: selectBlogListSaved(state),
  catsList: selectCatsList(state),
  dogsList: selectDogsList(state),
  sickAnimalsList: selectSickAnimals(state),
  savedAnimalsCount: selectSavedAnimalsCount(state),
  infoCard: selectSavedInfoCard(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({ 
  fetchAnimalsRequest: (kind?: AnimalKind, pageParams?: IRequestParams) => {
    switch (kind) {
      case AnimalKind.CAT: {
        return dispatch(actionFetchCatsRequest(pageParams));
      }
      case AnimalKind.DOG: {
        return dispatch(actionFetchDogsRequest(pageParams));
      }
      default: {
        return dispatch(actionFetchAnimalsRequest(pageParams))
      }
    }
  },
  fetchSavedAnimalsCount: () => dispatch(actionFetchSavedAnimalsCount()),
  fetchSickAnimals: () => dispatch(actionFetchSickAnimals()),
  fetchInfoCard: () => dispatch(actionFetchInfoCard()),
  fetchBlogList: (tag?: AllTag, pageParams?: IRequestParams) => {
    switch (tag) {
      case AllTag.SAVED: {
        return dispatch(actionHomeFetchBlogListSavedRequest(pageParams));
      }
      default: {
        return dispatch(actionHomeFetchBlogListRequest(pageParams));
      }
    }
  },
})

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageMain);
