import { connect } from "react-redux";
import { AnimalsListPage } from'./ui/AnimalsListPage';
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { actionAdminHomeFetchAnimalsRequest, actionAdminPostAnimalRequest, actionAdminUpdateAnimalRequest } from "../Home/store/actions";
import { ICustomAppState } from "../../../store/state";
import { actionFetchAnimalItemRequest, actionClearAnimalItemState } from "../../client/Animals/store/actions/animal.actions";
import { actionAdminFetchAllLocationsRequest } from "../Locations/store";


const mapStateToProps = (state: ICustomAppState) => {
    return {
        animalsList: state.AdminHomePage.animalsList,
        locations: state.AdminHomePage.animalsLocations,
        baseUrl: state.config.data.API_URL
        };
    };
    const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
        return bindActionCreators(
            {
                fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
                fetchLocations: actionAdminFetchAllLocationsRequest,
                fetchAnimalItem: actionFetchAnimalItemRequest,
                clearFetchAnimalItem:actionClearAnimalItemState,
                postAnimal: actionAdminPostAnimalRequest,
                updateAnimal: actionAdminUpdateAnimalRequest 
            },
            dispatch
          )
    }
    export const AnimalsList = connect(mapStateToProps, mapDispatchToProps)(AnimalsListPage);




