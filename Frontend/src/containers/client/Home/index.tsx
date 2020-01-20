import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {actionHomeFetchAnimalsRequest, actionHomeFetchDogsRequest, actionHomeFetchCatsRequest, actionHomeFetchSavedAnimalsCount} from "./store/actions";
import {ICustomAppState} from "../../../store/state";
import {selectAnimalsList, selectDogsList, selectSavedAnimalsCount, selectCatsList} from "./store/selectors";

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  catsList: selectCatsList(state),
  dogsList: selectDogsList(state),
  savedAnimalsCount: selectSavedAnimalsCount(state)
});

export const HomePage = connect(mapStateToProps, {
  fetchAnimalsRequest: actionHomeFetchAnimalsRequest,
  fetchDogsRequest: actionHomeFetchDogsRequest,
  fetchCatsRequest: actionHomeFetchCatsRequest,
  fetchSavedAnimalsCount: actionHomeFetchSavedAnimalsCount
})(HomePageMain);
