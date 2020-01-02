import {combineReducers} from "redux";
import {homePageReducer, HOME_PAGE_KEY} from "../../containers/client/Home/store/reducer";
import {AdminHomePageReducer, ADMIN_HOME_PAGE_KEY} from "../../containers/admin/Home/store/reducer";

import {i18nReducer} from "../../i18n/store/reducer";

export const createReducers = () => {
    return combineReducers({
        i18n: i18nReducer,
        [HOME_PAGE_KEY]: homePageReducer,
        [ADMIN_HOME_PAGE_KEY]: AdminHomePageReducer
    })
};
