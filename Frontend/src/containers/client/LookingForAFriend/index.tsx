import { LookingForAFriendPage } from './ui/LookingForAFriendPage';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { ICustomAppState } from '../../../store/state';
import { connect } from 'react-redux';
import { actionFetchSickAnimals, actionFetchAnimalsRequest } from '../Animals/store/actions';
import { actionFetchInfoCard, actionFetchInfoContacts } from '../Home/store/actions';
import { IRequestParams } from '../../../api/requestOptions';
import { selectAnimalsList } from '../Animals/store/selectors';



const mapStateToProps = (state: ICustomAppState) => {
    return {
        animalsList: state.animals.animalsList,
        sickAnimalsList: state.animals.sickAnimalsList,
        infoCard: state.homePage.infoCard,
        infoContacts: state.homePage.infoContacts,

    };
  };
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            fetchSickAnimals: actionFetchSickAnimals,
            fetchInfoCard: actionFetchInfoCard,
            fetchInfoContacts: actionFetchInfoContacts, 
            fetchAnimalsRequest: actionFetchAnimalsRequest,
        },
        dispatch
      )
}


export const LookingForAFriend = connect(mapStateToProps, mapDispatchToProps)(LookingForAFriendPage);