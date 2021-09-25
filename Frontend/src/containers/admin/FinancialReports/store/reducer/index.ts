import { genericRequestReducer } from '../../../../../api';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import {
  actionFinancialReportRequest,
  actionFinancialReportSuccess,
  actionFinancialReportFailure,
} from '../actions';
import { IFinanceReportsState, DEFAULT_FINANCE_REPORT } from '../state';
import { IFinancialReport } from '../../../../../api/financialReport';

const fetchFinancialReportStateReducer = genericRequestReducer(
  actionFinancialReportRequest,
  actionFinancialReportSuccess,
  actionFinancialReportFailure,
);
const sortingByDate = (data: IFinancialReport[]) => {
  data = data.sort((a: IFinancialReport, b: IFinancialReport): number => {
    return parseInt(a.date) - parseInt(b.date);
  });
  return data.map((iter): any => {
    return {
      ...iter,
      reports: iter.reports.sort((a, b): any => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }),
    };
  });
};

export const financialReportReducer = (
  state: IFinanceReportsState = DEFAULT_FINANCE_REPORT,
  action: AnyAction,
): IFinanceReportsState => {
  switch (action.type) {
    case getType(actionFinancialReportRequest):
      return {
        ...state,
        financeReportsRequestState: fetchFinancialReportStateReducer(
          state.financeReportsRequestState,
          action,
        ),
      };

    case getType(actionFinancialReportSuccess):
      return {
        ...state,
        financeReportsRequestState: fetchFinancialReportStateReducer(
          state.financeReportsRequestState,
          action,
        ),
        financeReports: sortingByDate(action.payload.data),
      };
    case getType(actionFinancialReportFailure):
      return {
        ...state,
        financeReportsRequestState: fetchFinancialReportStateReducer(
          state.financeReportsRequestState,
          action,
        ),
      };
    default:
      return state;
  }
};
export const REPORT_KEY = 'financialReport';
