import {connect} from "react-redux";
import {ICustomAppState} from "../../../store/state";
import { actionAdminHomeFetchAnimalsRequest, actionAdminDeleteAnimalRequest, actionAdminPostAnimalRequest, actionAdminUpdateAnimalRequest } from "../Home/store/actions";
import { PageAnimalEditCard } from "./ui/PageAnimalEditCard";
import {actionFetchAnimalItemRequest} from "../../client/Animals/store/actions/animal.actions";

const mapStateToProps = (state: ICustomAppState) => ({
    animal: state.animalItem.data,
});

export const AnimalAdminCard = connect(mapStateToProps, {
    fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
    deleteAnimal: actionAdminDeleteAnimalRequest,
    postAnimal: actionAdminPostAnimalRequest,
    updateAnimal: actionAdminUpdateAnimalRequest,
    fetchAnimalItem: actionFetchAnimalItemRequest,
})(PageAnimalEditCard);
