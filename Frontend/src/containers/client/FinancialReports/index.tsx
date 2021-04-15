import { FinancialReportsPage } from './ui/FinancialReportsPage';
import { FinancialReportsListPage } from './ui/FinancialReportsListPage';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import { ICustomAppState } from '../../../store/state';
import { connect } from 'react-redux';
import { actionFetchSickAnimals } from '../Animals/store/actions';
import {
  actionFetchInfoCard,
  actionFetchInfoContacts,
} from '../Home/store/actions';
import { actionFinancialReportRequest } from './store/actions';

const mapStateToProps = (state: ICustomAppState) => {
  return {
    sickAnimalsList: state.animals.sickAnimalsList,
    infoCard: state.homePage.infoCard,
    infoContacts: state.homePage.infoContacts,
    financeReports: state.financialReport.financeReports,
    appLanguage: state.appLanguage,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      fetchSickAnimals: actionFetchSickAnimals,
      fetchInfoCard: actionFetchInfoCard,
      fetchInfoContacts: actionFetchInfoContacts,
      fetchFinancialReport: actionFinancialReportRequest,
    },
    dispatch,
  );
};

export const FinancialReports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinancialReportsPage);
export const FinancialReportsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinancialReportsListPage);
