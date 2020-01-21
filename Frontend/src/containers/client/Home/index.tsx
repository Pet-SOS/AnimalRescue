import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {actionHomeFetchAnimalsRequest, actionHomeFetchDogsRequest, actionHomeFetchCatsRequest, actionHomeFetchSavedAnimalsCount} from "./store/actions";
import {ICustomAppState} from "../../../store/state";
import {selectAnimalsList, selectDogsList, selectSavedAnimalsCount, selectCatsList} from "./store/selectors";
import { IAnimalRequestParams, AnimalKind } from "../../../api/animals";
import { Dispatch } from "react";
import { AnyAction } from "redux";

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  catsList: selectCatsList(state),
  dogsList: selectDogsList(state),
  savedAnimalsCount: selectSavedAnimalsCount(state)
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
  fetchSavedAnimalsCount: () => dispatch(actionHomeFetchSavedAnimalsCount())
})

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageMain);
