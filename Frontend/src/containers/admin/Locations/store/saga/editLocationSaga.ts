import {
    actionAdminUpdateLocationFailure,
    actionAdminUpdateLocationRequest,
    actionAdminUpdateLocationSuccess
} from "../actions";
import {call, put} from "redux-saga/effects";
import {updateLocation} from "../../../../../api/admin";
import {actionShowSnackbar} from "../../../../../store/actions/snackbar.actions";

export function* editLocationsSaga(action: ReturnType<typeof actionAdminUpdateLocationRequest>) {
    const location = action.payload.location;
    try {
        yield call(updateLocation, location);
        yield put(actionAdminUpdateLocationSuccess(location));
        yield put(actionShowSnackbar('Location updated successfully'));
    } catch (e) {
        yield put(actionAdminUpdateLocationFailure(location, e));
        yield put(actionShowSnackbar('Error occurred during location update'));
    }
}
