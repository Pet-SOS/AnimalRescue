import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {ICustomAppState} from "../../../store/state";
import {
  selectAnimalsList,
  selectDogsList,
  selectSavedAnimalsCount,
  selectCatsList,
  selectSickAnimals,
  selectSavedInfoCard,
  selectBlogList,
  selectBlogListSaved,
  selectInfoContacts} from "./store/selectors";
import { AnimalKind } from "../../../api/animals";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
    actionHomeFetchSickAnimals,
    actionHomeFetchAnimalsRequest,
    actionHomeFetchDogsRequest,
    actionHomeFetchCatsRequest,
    actionHomeFetchSavedAnimalsCount,
    actionFetchInfoCard,
    actionHomeFetchBlogListRequest,
    actionHomeFetchBlogListSavedRequest,
    actionFetchInfoContacts,
} from "./store/actions";
import { IRequestParams } from "../../../api/requestOptions";
import { AllTag } from "../../../api/help";

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  blogList: selectBlogList(state),
  blogListSaved: selectBlogListSaved(state),
  catsList: selectCatsList(state),
  dogsList: selectDogsList(state),
  sickAnimalsList: selectSickAnimals(state),
  savedAnimalsCount: selectSavedAnimalsCount(state),
  infoCard: selectSavedInfoCard(state),
  infoContacts: selectInfoContacts(state),
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
 fetchInfoContacts:() =>dispatch(actionFetchInfoContacts())

})

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageMain);
