import {
    actionAdminFetchLocationsFailure,
    actionAdminFetchLocationsRequest,
    actionAdminFetchLocationsSuccess
} from "../actions";
import {call, put} from 'redux-saga/effects';
import {fetchLocations} from "../../../../../api/admin";
import {IRequestFilterParams, IRequestParams, RequestFilterOperators} from "../../../../../api/requestOptions";

export function* fetchLocationsSaga(action: ReturnType<typeof actionAdminFetchLocationsRequest>) {
    const type = action.payload.type;
    try {
        //  todo add type to filter code
        let params : IRequestParams = {...action.payload.requestParams};
        if (!params.filter){
            let filterParams : IRequestFilterParams = {
                fieldName : 'type.id',
                operator : RequestFilterOperators.EQ,
                value : type
            };
            params.filter = filterParams;
        }
        let list = yield call(fetchLocations, params );
        yield put(actionAdminFetchLocationsSuccess(type, list));
    } catch (e) {
        yield put(actionAdminFetchLocationsFailure(type, e))
    }
}
