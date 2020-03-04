import { genericRequestReducer } from "../../../../../api";
import { AnyAction } from "redux";
import { getType } from "typesafe-actions";
import { actionFinancialReportRequest, actionFinancialReportSuccess, actionFinancialReportFailure } from "../actions";
import { IFinanceReportsState, DEFAULT_FINANCE_REPORT } from "../state";
import { IFinancialReport } from "../../../../../api/financialReport";

const fetchFinancialReportStateReducer = genericRequestReducer(
    actionFinancialReportRequest,
    actionFinancialReportSuccess,
    actionFinancialReportFailure
)

export const financialReportReducer = (state: IFinanceReportsState = DEFAULT_FINANCE_REPORT, action: AnyAction): IFinanceReportsState => {
    switch (action.type) {
      case getType(actionFinancialReportRequest): 
        return {
          ...state,
          financeReportsRequestState: fetchFinancialReportStateReducer(state.financeReportsRequestState, action)
        }

      case getType(actionFinancialReportSuccess): 
        return {
          ...state,
          financeReportsRequestState: fetchFinancialReportStateReducer(state.financeReportsRequestState, action),
          financeReports: action.payload.data.sort((a:IFinancialReport, b:IFinancialReport):number=> {
            return parseInt(a.date) - parseInt(b.date);
          })
        }
      case getType(actionFinancialReportFailure): 
        return {
          ...state,
          financeReportsRequestState: fetchFinancialReportStateReducer(state.financeReportsRequestState, action),
        }
        default:
            return state;
    }
}
export const REPORT_KEY = 'financialReport';