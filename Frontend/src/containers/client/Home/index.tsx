import {connect} from "react-redux";
import {HomePageMain} from "./ui/Component";
import {actionHomeFetchAnimalsRequest} from "./store/actions";
import {ICustomAppState} from "../../../store/state";
import {selectAnimalsList} from "./store/selectors";

const mapStateToProps = (state: ICustomAppState) => ({
    animalsList: selectAnimalsList(state),
});

export const HomePage = connect(mapStateToProps, {
    fetchAnimalsRequest: actionHomeFetchAnimalsRequest
})(HomePageMain);
