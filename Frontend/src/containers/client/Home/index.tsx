import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {ICustomAppState} from "../../../store/state";
import {
  selectAnimalsList,
  selectDogsList,
  selectSavedAnimalsCount,
  selectCatsList,
  selectSickAnimals,
  selectSavedInfoCard} from "./store/selectors";
import { IAnimalRequestParams, AnimalKind } from "../../../api/animals";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
    actionHomeFetchSickAnimals,
    actionHomeFetchAnimalsRequest,
    actionHomeFetchDogsRequest,
    actionHomeFetchCatsRequest,
    actionHomeFetchSavedAnimalsCount,
    actionFetchInfoCard,
} from "./store/actions";

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  catsList: selectCatsList(state),
  dogsList: selectDogsList(state),
  sickAnimalsList: selectSickAnimals(state),
  savedAnimalsCount: selectSavedAnimalsCount(state),
  infoCard: selectSavedInfoCard(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({ 
  fetchAnimalsRequest: (kind?: AnimalKind, pageParams?: IAnimalRequestParams) => {
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
})

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageMain);
