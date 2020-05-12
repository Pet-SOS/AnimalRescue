import {connect} from "react-redux";
import {ICustomAppState} from "../../../store/state";
import { actionAdminHomeFetchAnimalsRequest, actionAdminDeleteAnimalRequest, actionAdminPostAnimalRequest, actionAdminUpdateAnimalRequest } from "../Home/store/actions";
import { PageAnimalEditCard } from "./ui/PageAnimalEditCard";

const mapStateToProps = (state: ICustomAppState) => ({
    animal: state.animalItem.data,
    tagsList: state.tags.data
});

export const AnimalAdminCard = connect(mapStateToProps, {
    fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
    deleteAnimal: actionAdminDeleteAnimalRequest,
    postAnimal: actionAdminPostAnimalRequest,
    updateAnimal: actionAdminUpdateAnimalRequest
})(PageAnimalEditCard);