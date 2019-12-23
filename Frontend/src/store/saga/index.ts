import { all } from 'redux-saga/effects';
import logger from '../logger';

import {watchHomePage} from "../../containers/client/Home/store/saga";

export function* appSaga() {
    try {
        yield all([watchHomePage()]);
    } catch (e) {
        logger.error(e);
    }
}