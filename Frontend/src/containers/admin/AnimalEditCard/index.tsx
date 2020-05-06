import {connect} from "react-redux";
import {ICustomAppState} from "../../../store/state";
import { actionAdminHomeFetchAnimalsRequest, actionAdminDeleteAnimalRequest, actionAdminPostAnimalRequest, actionAdminUpdateAnimalRequest } from "../Home/store/actions";
import { PageAnimalEditCard } from "./ui/PageAnimalEditCard";
import { actionGetTagsList } from '../../../store/actions/tags.actions';

const mapStateToProps = (state: ICustomAppState) => ({
    animal: state.animalItem.data,
    tagsList: state.tags.data
});

export const AnimalAdminCard = connect(mapStateToProps, {
    fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
    deleteAnimal: actionAdminDeleteAnimalRequest,
    postAnimal: actionAdminPostAnimalRequest,
    updateAnimal: actionAdminUpdateAnimalRequest,
    fetchTags: actionGetTagsList
})(PageAnimalEditCard);