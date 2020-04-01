import { connect } from "react-redux";
import { AnimalsListPage } from'./ui/AnimalsListPage';
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { actionAdminHomeFetchAnimalsRequest, actionAdminPostAnimalRequest, actionAdminUpdateAnimalRequest } from "../Home/store/actions";
import { IAnimalsResponse } from "../../../api/animals";
import { ICustomAppState } from "../../../store/state";
import { actionFetchAnimalItemRequest } from "../../client/Animals/store/actions/animal.actions";

interface IAnimalsListPageState{
    animalsList: IAnimalsResponse
}
const mapStateToProps = (state: ICustomAppState) => {
    return {
        animalsList: state.AdminHomePage.animalsList,
        baseUrl: state.config.data.API_URL
        };
    };
    const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
        return bindActionCreators(
            {
                fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
                fetchAnimalItem: actionFetchAnimalItemRequest,
                postAnimal: actionAdminPostAnimalRequest,
                updateAnimal: actionAdminUpdateAnimalRequest 
            },
            dispatch
          )
    }
    export const AnimalsList = connect(mapStateToProps, mapDispatchToProps)(AnimalsListPage);




