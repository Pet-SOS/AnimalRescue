import { actionAdminLoginRequest, actionAdminLoginRequestSuccess, actionAdminLoginRequestFailure } from "../actions";
import { fetchlogin } from "../../../../../api/login";
import { call, put, takeEvery} from 'redux-saga/effects';
import { getType } from "typesafe-actions";


function* postLoginSaga(action: { type: string, payload?: any}) {
    debugger
    try {
        console.log('action', action);
        const data = action.payload;
        const response = yield call(fetchlogin, {data});
        console.log('response',response);
        yield put(actionAdminLoginRequestSuccess(response)) 
    } catch (e) {
        yield put(actionAdminLoginRequestFailure(e))
    }
}

export function* watchLoginRequestHomePage() {
    yield takeEvery(getType(actionAdminLoginRequest), postLoginSaga)
}