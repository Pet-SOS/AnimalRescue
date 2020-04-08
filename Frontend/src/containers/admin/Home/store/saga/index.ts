import {takeEvery, call, put} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchAnimals, deleteAnimal, postAnimal, updateAnimal} from "../../../../../api/animals";

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

function* fetchHomePageAnimalsListSaga(action: { type: string, payload?: IRequestParams }) {
    try {
        const response = yield call(fetchAnimals,action.payload);
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
    try {
        yield call(updateAnimal, action.payload);
        yield put(actionAdminUpdateAnimalSuccess())
        yield put(actionAdminHomeFetchAnimalsRequest())
    } catch (e) {
        yield put(actionAdminUpdateAnimalFailure(e))
    }
}


export function* watchAdminHomePage() {
    yield takeEvery(getType(actionAdminHomeFetchAnimalsRequest), fetchHomePageAnimalsListSaga)
    yield takeEvery(getType(actionAdminDeleteAnimalRequest), deleteAnimalSaga)
    yield takeEvery(getType(actionAdminPostAnimalRequest), postAnimalSaga)
    yield takeEvery(getType(actionAdminUpdateAnimalRequest), updateAnimalSaga)
}
