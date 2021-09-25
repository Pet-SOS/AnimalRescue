import { ContactsPage } from './ui/ContactsPage';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { ICustomAppState } from '../../../store/state';
import { connect } from 'react-redux';
import {
  actionFetchInfoCard,
  actionFetchInfoContacts,
} from '../Home/store/actions';
import { actionFetchSickAnimals } from '../Animals/store/actions';

const mapStateToProps = (state: ICustomAppState) => {
  return {
    sickAnimalsList: state.animals.sickAnimalsList,
    infoCard: state.homePage.infoCard,
    infoContacts: state.homePage.infoContacts,
    appLanguage: state.appLanguage
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      fetchSickAnimals: actionFetchSickAnimals,
      fetchInfoCard: actionFetchInfoCard,
      fetchInfoContacts: actionFetchInfoContacts,
    },
    dispatch,
  );
};

export const Contacts = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsPage);
