import {
  actionAdminFetchLocationsFailure,
  actionAdminFetchLocationsRequest,
  actionAdminFetchLocationsSuccess,
} from '../actions';
import { call, put } from 'redux-saga/effects';
import { fetchLocations } from '../../../../../api/admin';
import {
  IRequestParams,
  RequestFilterOperators,
} from '../../../../../api/requestOptions';

export function* fetchLocationsSaga(
  action: ReturnType<typeof actionAdminFetchLocationsRequest>,
) {
  const type = action.payload.type;
  try {
    let params: IRequestParams = { ...action.payload.requestParams };
    if (!params.filter) {
      params.filter = {
        fieldName: 'type.id',
        operator: RequestFilterOperators.EQ,
        value: type,
      };
    }
    // load special number of items until made paging
    params.size = 100;
    let list = yield call(fetchLocations, params);
    yield put(actionAdminFetchLocationsSuccess(type, list));
  } catch (e) {
    yield put(actionAdminFetchLocationsFailure(type, e));
  }
}
