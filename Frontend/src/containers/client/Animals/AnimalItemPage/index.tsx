import { connect } from "react-redux";
import { ICustomAppState } from "../../../../store/state";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { IRequestParams } from "../../../../api/requestOptions";
import { selectAnimalItem } from "../store/selectors/animalitem.selector";
import { selectAnimalsList, selectSickAnimals } from "../store/selectors";
import { actionFetchAnimalItemRequest, actionClearAnimalItemState } from "../store/actions/animal.actions";
import { actionFetchAnimalsRequest } from "../store/actions";
import { actionClearEntireBlogsState } from "../../Blog/store/actions";
import { AnimalItemPageComponent } from "./Component";

const mapStateToProps = (state: ICustomAppState) => ({
  animalItem: selectAnimalItem(state),
  animalsList: selectAnimalsList(state),
  sickAnimalsList: selectSickAnimals(state)
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchAnimalItem: (id: string) => dispatch(actionFetchAnimalItemRequest(id)),
  clearAnimalItemState: () => dispatch(actionClearAnimalItemState()),
  fetchAnimalsList: (requestParams?: IRequestParams) => dispatch(actionFetchAnimalsRequest(requestParams)),
  clearAnimalsState: () => dispatch(actionClearEntireBlogsState())
})

export const AnimalItemPage = connect(mapStateToProps, mapDispatchToProps)(AnimalItemPageComponent);