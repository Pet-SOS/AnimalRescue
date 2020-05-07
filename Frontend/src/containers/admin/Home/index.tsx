import {connect} from "react-redux";
import {AdminHomePage} from "./ui/Component";
import {ICustomAppState} from "../../../store/state";
import {
    actionAdminDeleteAnimalRequest,
    actionAdminHomeFetchAnimalsRequest,
    actionAdminPostAnimalRequest, actionAdminUpdateAnimalRequest
} from "./store/actions";
import {selectAnimalsList} from "./store/selectors";

const mapStateToProps = (state: ICustomAppState) => ({
    animalsList: selectAnimalsList(state)
});

export const HomePage = connect(mapStateToProps, {
    fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
    deleteAnimal: actionAdminDeleteAnimalRequest,
    postAnimal: actionAdminPostAnimalRequest,
    updateAnimal: actionAdminUpdateAnimalRequest
})(AdminHomePage);
