import { take, call } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { actionGetApiConfigSuccess } from "../actions/config.actions";
import { requestRefreshToken } from "../../api/login";

function* refreshTokenSaga() {
  const response = yield call(requestRefreshToken);
  if (
    response.status === 400 &&
    response.data.Error !== "This token hasn't expired yet"
  ) {
    localStorage.removeItem("jwt-token");
  }
}

export function* refreshToken() {
  yield take(getType(actionGetApiConfigSuccess));
  yield refreshTokenSaga();
}
