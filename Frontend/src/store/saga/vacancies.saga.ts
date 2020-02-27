import { takeEvery, call, put } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { IRequestParams } from "../../api/requestOptions";
import { fetchVacancies } from "../../api/vacancies";
import { actionFetchVacanciesSuccess, actionFetchVacanciesFailure, actionFetchVacanciesRequest } from "../actions/vacancies.actions";

function* getVacancies(action: { type: string, payload?: IRequestParams }) {
  try {
    const response = yield call(fetchVacancies, action.payload);
    yield put(actionFetchVacanciesSuccess(response))
  } catch (e) {
    yield put(actionFetchVacanciesFailure(e))
  }
}

export function* watchVacancies() {
  yield takeEvery(getType(actionFetchVacanciesRequest), getVacancies);
}