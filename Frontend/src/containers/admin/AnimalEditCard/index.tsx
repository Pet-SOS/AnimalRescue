import {connect} from "react-redux";
import {ICustomAppState} from "../../../store/state";
import { actionAdminHomeFetchAnimalsRequest, actionAdminDeleteAnimalRequest, actionAdminPostAnimalRequest, actionAdminUpdateAnimalRequest } from "../Home/store/actions";
import { PageAnimalEditCard } from "./ui/PageAnimalEditCard";
import {actionFetchAnimalItemRequest} from "../../client/Animals/store/actions/animal.actions";
import {selectTagsCategoryListData} from "../../../store/selectors/tags.selector";

const mapStateToProps = (state: ICustomAppState) => ({
    animal: state.animalItem.data,
    // tagsList: state.tags.data
    tagsList: selectTagsCategoryListData(state)
});

export const AnimalAdminCard = connect(mapStateToProps, {
    fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
    deleteAnimal: actionAdminDeleteAnimalRequest,
    postAnimal: actionAdminPostAnimalRequest,
    updateAnimal: actionAdminUpdateAnimalRequest,
    fetchAnimalItem: actionFetchAnimalItemRequest,
})(PageAnimalEditCard);
