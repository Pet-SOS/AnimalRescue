import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import {
  actionFetchHelpPopup,
  actionFetchHomePopup,
  actionFetchInfoCard,
  actionFetchInfoContacts,
} from '../../client/Home/store/actions';
import { connect } from 'react-redux';
import { CommonInfoPage } from './ui/CommonInfoPage';
import { ICustomAppState } from '../../../store/state';

const mapStateToProps = (state: ICustomAppState) => {
  return {
    infoCard: state.homePage.infoCard,
    infoContacts: state.homePage.infoContacts,
    helpPopup: state.homePage.helpPopup,
    homePopup: state.homePage.homePopup,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      fetchInfoCard: actionFetchInfoCard,
      fetchInfoContacts: actionFetchInfoContacts,
      fetchHelpPopup: actionFetchHelpPopup,
      fetchHomePopup: actionFetchHomePopup,
    },
    dispatch,
  );
};

export const CommonInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommonInfoPage);
