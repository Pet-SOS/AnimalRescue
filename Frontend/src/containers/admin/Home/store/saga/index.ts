import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {deleteAnimal, postAnimal, updateAnimal, fetchAdminAnimals, IAnimal} from "../../../../../api/animals";

import {
    actionAdminHomeFetchAnimalsRequest,
    actionAdminHomeFetchAnimalsSuccess,
    actionAdminHomeFetchAnimalsFailure,
    actionAdminDeleteAnimalRequest,
    actionAdminDeleteAnimalSuccess,
    actionAdminDeleteAnimalFailure,
    actionAdminPostAnimalSuccess,
    actionAdminPostAnimalRequest,
    actionAdminPostAnimalFailure,
    actionAdminUpdateAnimalRequest,
    actionAdminUpdateAnimalFailure,
    actionAdminUpdateAnimalSuccess
} from "../actions";
import { IRequestParams } from '../../../../../api/requestOptions';
import {actionFetchAnimalItemRequest} from "../../../../client/Animals/store/actions/animal.actions";
import { 
    actionAdminFetchAllLocationsRequest, 
    actionAdminFetchAllLocationsSuccess, 
    actionAdminFetchAllLocationsFailure 
} from '../../../Locations/store/actions/index';
import { fetchLocations } from '../../../../../api/admin/locations';

function* fetchHomePageAnimalsListSaga(action: { type: string, payload?: IRequestParams }) {
    try {
        const response = yield call(fetchAdminAnimals,action.payload);
        yield put(actionAdminHomeFetchAnimalsSuccess(response))
    } catch (e) {
        yield put(actionAdminHomeFetchAnimalsFailure(e))
    }
}

function* deleteAnimalSaga(action: ReturnType<typeof actionAdminDeleteAnimalRequest>) {
    try {
        const id = action.payload
        yield call(deleteAnimal, id);
        yield put(actionAdminDeleteAnimalSuccess())
        yield put(actionAdminHomeFetchAnimalsRequest())
    } catch (e) {
        yield put(actionAdminDeleteAnimalFailure(e))
    }
}

function* postAnimalSaga(action: ReturnType<typeof actionAdminPostAnimalRequest>) {
    try {
        const animal = action.payload
        yield call(postAnimal, {animal});
        yield put(actionAdminPostAnimalSuccess())
        yield put(actionAdminHomeFetchAnimalsRequest())
    } catch (e) {
        yield put(actionAdminPostAnimalFailure(e))
    }
}

function* updateAnimalSaga(action: ReturnType<typeof actionAdminUpdateAnimalRequest>) {
    const requestData = {...action.payload};
    requestData.animal.previousImageIds = requestData.animal.imageIds.slice();
    try {
        yield call(updateAnimal, requestData);
        if (requestData.id) {
            yield put(actionFetchAnimalItemRequest(requestData.id));
        }
        yield put(actionAdminUpdateAnimalSuccess())
        yield put(actionAdminHomeFetchAnimalsRequest())
    } catch (e) {
        yield put(actionAdminUpdateAnimalFailure(e))
    }
}

export function* fetchAllLocationsSaga(action: ReturnType<typeof actionAdminFetchAllLocationsRequest>) {
    try {
        let params: IRequestParams = {...action.payload.requestParams};
        // load special number of items until made paging
        params.size = 100;
        let list = yield call(fetchLocations, params);
        yield put(actionAdminFetchAllLocationsSuccess(list));
    } catch (e) {
        yield put(actionAdminFetchAllLocationsFailure(e))
    }
}


export function* watchAdminHomePage() {
    yield takeEvery(getType(actionAdminHomeFetchAnimalsRequest), fetchHomePageAnimalsListSaga)
    yield takeEvery(getType(actionAdminFetchAllLocationsRequest), fetchAllLocationsSaga);
    yield takeEvery(getType(actionAdminDeleteAnimalRequest), deleteAnimalSaga)
    yield takeEvery(getType(actionAdminPostAnimalRequest), postAnimalSaga)
    yield takeEvery(getType(actionAdminUpdateAnimalRequest), updateAnimalSaga)
}
