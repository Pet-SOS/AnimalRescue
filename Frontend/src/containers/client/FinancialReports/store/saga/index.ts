import { IRequestParams } from "../../../../../api/requestOptions";
import { takeEvery, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { actionFinancialReportFailure, actionFinancialReportSuccess, actionFinancialReportRequest } from "../actions";
import { fetchFinancialReport } from "../../../../../api/financialReport";

function* getFinancialReport(action: { type: string, payload?: IRequestParams }){
    try{
        const response =  yield call(fetchFinancialReport, action.payload);
        yield put(actionFinancialReportSuccess(response))
    } catch (e) {
        yield put(actionFinancialReportFailure(e))
    }
}

export function* watchFinancialReport() {
    yield takeEvery(getType(actionFinancialReportRequest ), getFinancialReport);
  }