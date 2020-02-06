import { LookingForAFriendPage } from './ui/LookingForAFriendPage';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { ICustomAppState } from '../../../store/state';
import { connect } from 'react-redux';
import { actionFetchSickAnimals } from '../Animals/store/actions';
import { actionFetchInfoCard, actionFetchInfoContacts } from '../Home/store/actions';



const mapStateToProps = (state: ICustomAppState) => {
    return {
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
        },
        dispatch
      )
}


export const LookingForAFriend = connect(mapStateToProps, mapDispatchToProps)(LookingForAFriendPage);