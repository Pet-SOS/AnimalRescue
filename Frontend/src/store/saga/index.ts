import {all} from 'redux-saga/effects';
import logger from '../logger';

import {watchHomePage} from "../../containers/client/Home/store/saga";
import {watchAdminHomePage} from "../../containers/admin/Home/store/saga";
import { watchAnimals } from '../../containers/client/Animals/store/saga';

export function* appSaga() {
    try {
        yield all([watchAdminHomePage(), watchHomePage(), watchAnimals()]);
    } catch (e) {
        logger.error(e);
    }
}
