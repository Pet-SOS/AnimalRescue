import { createAction } from 'typesafe-actions';
import { IFinancialReport } from '../../../../../api/financialReport';
import { IRequestParams } from '../../../../../api/requestOptions';

export const actionFinancialReportRequest = createAction(
  'FETCH_FINANCE_REPORT_REQUEST',
  resolve => (requestParams?: IRequestParams) => resolve(requestParams),
);
export const actionFinancialReportSuccess = createAction(
  'FETCH_FINANCE_REPORT_SUCCESS',
  resolve => (data: IFinancialReport[]) => resolve(data),
);
export const actionFinancialReportFailure = createAction(
  'FETCH_FINANCE_REPORT_FAILURE',
  resolve => (error: Error) => resolve({ error }),
);
