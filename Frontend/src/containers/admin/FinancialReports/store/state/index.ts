import { IFinancialReport } from "../../../../../api/financialReport";
import { IRequestState, DEFAULT_REQUEST_STATE } from "../../../../../api";

export interface IFinanceReportsState {
    financeReports: IFinancialReport[]
    financeReportsRequestState: IRequestState;
}
export const DEFAULT_FINANCE_REPORT:IFinanceReportsState = {
    financeReports: [],
    financeReportsRequestState: { ...DEFAULT_REQUEST_STATE },
}
