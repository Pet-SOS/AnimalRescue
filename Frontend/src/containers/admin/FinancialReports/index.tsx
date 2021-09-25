import { FinancialReportsPage } from './ui/FinancialReportsPage';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { ICustomAppState } from '../../../store/state';
import { connect } from 'react-redux';
import { actionFinancialReportRequest } from '../../client/FinancialReports/store/actions';

const mapStateToProps = (state: ICustomAppState) => {
  return {
    financeReports: state.financialReport.financeReports,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      fetchFinancialReport: actionFinancialReportRequest,
    },
    dispatch,
  );
};

export const FinancialReports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinancialReportsPage);
