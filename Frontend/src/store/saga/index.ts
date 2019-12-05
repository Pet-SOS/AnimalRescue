import { all } from 'redux-saga/effects';
import logger from '../logger';

export function* appSaga() {
    try {
        yield all([]);
    } catch (e) {
        logger.error(e);
    }
}