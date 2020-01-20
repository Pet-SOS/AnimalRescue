import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {actionHomeFetchAnimalsRequest, actionHomeFetchSavedAnimalsCount} from "./store/actions";
import {ICustomAppState} from "../../../store/state";
import {selectAnimalsList, selectSavedAnimalsCount} from "./store/selectors";

const mapStateToProps = (state: ICustomAppState) => ({
    animalsList: selectAnimalsList(state),
    savedAnimalsCount: selectSavedAnimalsCount(state)
});

export const HomePage = connect(mapStateToProps, {
    fetchAnimalsRequest: actionHomeFetchAnimalsRequest,
    fetchSavedAnimalsCount: actionHomeFetchSavedAnimalsCount
})(HomePageMain);
