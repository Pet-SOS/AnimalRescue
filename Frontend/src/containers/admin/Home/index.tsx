import { connect } from 'react-redux';
import { AdminHomePage } from './ui/Component';
import { ICustomAppState } from '../../../store/state';
import {
  actionAdminDeleteAnimalRequest,
  actionAdminHomeFetchAnimalsRequest,
  actionAdminPostAnimalRequest,
  actionAdminUpdateAnimalRequest,
} from './store/actions';
import { selectAnimalsList } from './store/selectors';
import { actionFetchAnimalItemRequest } from '../../client/Animals/store/actions/animal.actions';

const mapStateToProps = (state: ICustomAppState) => ({
  animalsList: selectAnimalsList(state),
  tagsList: state.tags.data,
});

export const HomePage = connect(mapStateToProps, {
  fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
  deleteAnimal: actionAdminDeleteAnimalRequest,
  postAnimal: actionAdminPostAnimalRequest,
  updateAnimal: actionAdminUpdateAnimalRequest,
  fetchAnimalItem: actionFetchAnimalItemRequest,
})(AdminHomePage);
